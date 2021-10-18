package uj.norbertbaran.planningsystemapi.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Service
public class JwtProvider{
    @Autowired
    private Environment env;
    private KeyStore keyStore;
    private String jksFile;
    private String jksPassword;
    private String jksAlias;

    @PostConstruct
    public void init(){
        try{

            jksFile = env.getProperty("jwt-provider.jks-file");
            jksPassword = env.getProperty("jwt-provider.jks-password");
            jksAlias = env.getProperty("jwt-provider.jks-alias");

            keyStore = KeyStore.getInstance("JKS");
            InputStream resourceAsStream = getClass().getResourceAsStream(jksFile);
            keyStore.load(resourceAsStream, jksPassword.toCharArray());
        } catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e){
            throw new PlanningSystemException("Keystore loading exception");
        }
    }

    private RSAPrivateKey getPrivateKey(){
        try{
            return (RSAPrivateKey) keyStore.getKey(jksAlias, jksPassword.toCharArray());
        } catch (NoSuchAlgorithmException | KeyStoreException | UnrecoverableKeyException e) {
            throw new PlanningSystemException("Retrieve public key from keystore exception");
        }
    }

    private RSAPublicKey getPublicKey(){
        try {
            return (RSAPublicKey) keyStore.getCertificate(jksAlias).getPublicKey();
        } catch (KeyStoreException e) {
            throw new PlanningSystemException("Retrieve public key from keystore exception");
        }
    }

    public String generateToken(Authentication authentication){
        User principal = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.RSA256(getPublicKey(), getPrivateKey());
        return JWT.create().withSubject(principal.getUsername()).sign(algorithm);
    }


    public boolean validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.RSA256(getPublicKey(), getPrivateKey());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (JWTVerificationException exception){
            return false;
        }
    }

    public String getUsernameFromJwt(String token){

        Algorithm algorithm = Algorithm.RSA256(getPublicKey(), getPrivateKey());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();
    }
}
