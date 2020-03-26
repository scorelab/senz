import java.net.*;
import java.io.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

public class Client {
  private Socket socket = null;
  private PrintWriter out = null;
  
  public Client() {
    try {
      socket = new Socket("localhost", 2552);
    }
    catch(UnknownHostException e)
		{
			System.out.println(e);
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
  }

  public String getTimeStamp() {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");  
		LocalDateTime now = LocalDateTime.now();
    return dtf.format(now);
  }

  public String receiveMessage() {
    try {
      InputStreamReader isr = new InputStreamReader(socket.getInputStream());
      BufferedReader br = new BufferedReader(isr);
      return br.readLine();
    }
    catch(Exception e) {
      System.out.println(e);
      return null;
    }
  }

  public void sendMessage(String message) {
    try {
      out = new PrintWriter(socket.getOutputStream());
      byte bytes[] = message.getBytes();
      String msg = new String(bytes, "UTF-8");
      out.print(msg);
      out.flush();
      String res = receiveMessage();
      System.out.println("Server: "+res);
    }
    catch(Exception e) {
      System.out.println(e);
    }
  }
}
