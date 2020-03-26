public class Receiver {
  static String deviceName = "dev2";
  static String sharedKey = "LGWlhb329Y09oluI";
  static String imagePathToStore = "received.jpg";

  public static void main(String args[]) {
    Client client = new Client();
    Image_Utils imageUtils = new Image_Utils();
    AES_Utils aesUtils;

    // Register device
    System.out.println("Registering...");
    String msg = "SHARE #pubkey key @senz #time "+client.getTimeStamp()+" ^"+deviceName+" signature";
    client.sendMessage(msg);

    // Receive message
    System.out.println("Ready to receive image");
    String reply = client.receiveMessage();
    String byteString = reply.split(" ")[2];
    System.out.println("Image received...");

    // Decode using aes crypto
    aesUtils = new AES_Utils(sharedKey);
    byteString = aesUtils.decrypt(byteString);

    // Save Image
    imageUtils.stringToImage(byteString, imagePathToStore);
    System.out.printf("Image saved (%s)\n", imagePathToStore);

    // Unregister device
    System.out.println("Unregistering...");
    msg = "UNSHARE #pubkey key @senz #time "+client.getTimeStamp()+" ^"+deviceName+" signature";
    client.sendMessage(msg);
  }
}
