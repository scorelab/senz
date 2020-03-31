import java.io.*;
import java.util.*;

public class Image_Utils {
  private static String encodedFile = null;
  
  public String imageToString(String filePath) {
    File file = new File(filePath);
    try {
      FileInputStream fis = new FileInputStream(file);
      byte[] bytes = new byte[(int)file.length()];
      fis.read(bytes);
      encodedFile = Base64.getEncoder().encodeToString(bytes);
      fis.close();
    }
    catch(FileNotFoundException e) {
      e.printStackTrace();
    }
    catch(IOException e) {
      e.printStackTrace();
    }

    return encodedFile;
  }

  public void stringToImage(String encodedFile, String filePath) {
    byte[] bytes = Base64.getDecoder().decode(encodedFile);
    
    try {
      OutputStream stream = new FileOutputStream(filePath);
      stream.write(bytes);
      stream.close();
    }
    catch(Exception e) {
			System.out.println(e);
    }
	}
}
