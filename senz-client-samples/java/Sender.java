import java.util.Scanner;

public class Sender {
  static String deviceName = "dev1";
  static String sharedKey =  "LGWlhb329Y09oluI";
  static String imagePathToSend = "sample.jpg";

  public static void main(String args[]) {
    Client client = new Client();
    Image_Utils imageUtils = new Image_Utils();
    AES_Utils aesUtils;
    Scanner sc = new Scanner(System.in);

    // Register device
    System.out.println("Registering device...");
    String msg = "SHARE #pubkey key @senz #time "+client.getTimeStamp()+" ^"+deviceName+" signature";
    client.sendMessage(msg);

    // Convert image to byte string
    String byteString = imageUtils.imageToString(imagePathToSend);

    // Encrypt using AES Crypto
    aesUtils = new AES_Utils(sharedKey);
    byteString = aesUtils.encrypt(byteString);

    // Send the message
    System.out.println("Press enter to send the image...");
    sc.nextLine();

    msg = "DATA $image " + byteString +" @dev2 #time " + client.getTimeStamp() + " ^dev1 signature";
    client.sendMessage(msg);

    // Unregister device
    System.out.println("Unregistering device...");
    msg = "UNSHARE #pubkey key @senz #time " + client.getTimeStamp() +" ^"+ deviceName +" signature";
    client.sendMessage(msg);
    sc.close();
  }
}
