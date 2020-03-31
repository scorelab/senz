import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AES_Utils {

  private static SecretKeySpec secretKey;
  private static int bs;

  public AES_Utils(String myKey) {
    MessageDigest sha = null;
    bs = 32;
    try {
      byte[] key = myKey.getBytes("UTF-8");
      sha = MessageDigest.getInstance("SHA-256");
      key = sha.digest(key);
      key = Arrays.copyOf(key, 16);
      secretKey = new SecretKeySpec(key, "AES");
    }
    catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }
  }

  public static String pad(String str) {
    String res="";
    int num = bs-str.length()%bs;
    for(int i=0;i<num;i++) {
      res+=(char)num;
    }
    return str+res;
  }

  public static String unpad(String str) {
    int len = str.length();
    return str.substring(0, len-(int)str.charAt(len-1));
  }

  public String encrypt(String strToEncrypt) {
    try {
      strToEncrypt = pad(strToEncrypt);
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.ENCRYPT_MODE, secretKey);
      return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
    }
    catch (Exception e) {
      System.out.println("Error while encrypting: " + e.toString());
    }
    return null;
  }

  public String decrypt(String strToDecrypt) {
    try {
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.DECRYPT_MODE, secretKey);
      return unpad(new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt))));
    }
    catch (Exception e) {
      System.out.println("Error while decrypting: " + e.toString());
    }
    return null;
  }
}
