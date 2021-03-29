import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.google.firebase.database.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.apache.http.protocol.HTTP.UTF_8;

public class main {

    public static void main(String[] args) {

        try {
            FileInputStream serviceAccount;
            serviceAccount = new FileInputStream("C:\\Users\\Randy Quaye\\IdeaProjects\\sacamos-server\\src\\serviceAccountKey.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://finalyear-7d906.firebaseio.com")
                    .setStorageBucket("finalyear-7d906.appspot.com")
                    .build();
            FirebaseApp.initializeApp(options);


        } catch (IOException ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
            System.exit(1);
        }




        // As an admin, the app has access to read and write all data, regardless of Security Rules
        DatabaseReference database = FirebaseDatabase.getInstance().getReference();

        //Start Listeners
        cableListener(database);
        bundleListener(database);

        Scanner scanner = new Scanner(System.in);
        while (!scanner.nextLine().equals("Quit")) {}
    }

    /**************CABLE PROCESSING*******************/

    public static void cableListener(DatabaseReference database){
        DatabaseReference cablesRef = database.child("Cyl_cables");
        // Attach a listener to read and process the data at our cables reference
        cablesRef.orderByChild("status").equalTo(1).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot snapshot, String previousChildName) {
                CylindricalCable c = snapshot.child("cable_spec").getValue(CylindricalCable.class);
                System.out.println(c.getName());
                c.setID(snapshot.getKey());
                writeCableSpecFile(c);
                cablesRef.child(c.getID()).child("status").setValueAsync(buildCable(c.getID()));
            }

            @Override
            public void onChildChanged(DataSnapshot snapshot, String previousChildName) {

            }

            @Override
            public void onChildRemoved(DataSnapshot snapshot) {
            }

            @Override
            public void onChildMoved(DataSnapshot snapshot, String previousChildName) {

            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public static void writeCableSpecFile(CylindricalCable c) {

        //TODO : Sort out the params and remove default zeros from Ao and Bo

        String spec_data = "# MOD_cable_lib_dir \r\n" +
                "../MOD/CABLE/\r\n" +
                "Cylindrical\r\n" +
                "1 #number of conductors \r\n" +
                "3 #number of parameters \r\n" +
                String.valueOf(c.getC_Radius()) + " # parameter 1: conductor radius\r\n" +
                String.valueOf(c.getD_Radius()) + " # parameter 2: dielectric radius\r\n" +
                String.valueOf(c.getC_conductivity()) + " # parameter 3: conductivity\r\n" +
                "1 \t\t\t# number of frequency dependent parameters\r\n" +
                "# Dielectric relative permittivity model follows\r\n" +
                String.valueOf(c.getNormalisation()) + " # w normalisation constant\r\n" +
                0 + " # a order, a coefficients follow below\r\n" +
                String.valueOf(c.getAc()) + "\r\n" +
                0 + " # b order, b coefficients follow below\r\n" +
                String.valueOf(c.getBc());

        //Create file;
        String file_path = "C:/Users/Randy Quaye/Documents/SACAMOS/MOD/CABLE/";
        String file = file_path + c.getID() + ".cable_spec";


        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            writer.write(spec_data);
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }



    }

    public static int buildCable(String filename) {

        String filepath = "\""+"C:\\Users\\Randy Quaye\\Documents\\SACAMOS\\MOD\\CABLE\\"+ filename + "\"";
        String cmd1 = "cd C:/Users/Randy Quaye/Documents/SACAMOS/BIN";
        String cmd2 = "cable_model_builder.exe "+filepath;


        ProcessBuilder builder = new ProcessBuilder(
                "cmd.exe", "/c", cmd1 + "&& "+cmd2);
        builder.redirectErrorStream(true);
        Process p = null;
        try {
            p = builder.start();

            BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line,strLine="";

            while ((line = r.readLine()) != null) strLine = line;

            if(strLine.equals("cable_model_builder:Finished_Correctly")){
                //Write cable status to 4
                return 4;
            }
            else{ return -1;}
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }


    }


    /**************BUNDLE PROCESSING*******************/

    public static void bundleListener(DatabaseReference database){

        DatabaseReference bundleRef = database.child("Bundles");
        bundleRef.orderByChild("status").equalTo(1).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot snapshot, String previousChildName) {
                Bundle b = snapshot.child("bundle_spec").getValue(Bundle.class);
                System.out.println(b.getBundleName());
                b.setBundleID(snapshot.getKey());
                writeBundleSpecFile(b);
                bundleRef.child(b.getBundleID()).child("status").setValueAsync(buildBundle(b.getBundleID()));
            }

            @Override
            public void onChildChanged(DataSnapshot snapshot, String previousChildName) {

            }

            @Override
            public void onChildRemoved(DataSnapshot snapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot snapshot, String previousChildName) {

            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
    }

    public static void  writeBundleSpecFile(Bundle b){

        String data  = "#MOD_cable_lib_dir\r\n" +
                        "../MOD/CABLE/\r\n" +
                        "#MOD_cable_lib_dir\r\n" +
                        "../MOD/BUNDLE/\r\n" +
                        b.getNumber_of_params() +" #Number of cables in bundle, cable list follows\r\n";
        ArrayList<BundleComponent> bC = b.getComponents();

        for(int i = 0;i<b.getNumber_of_params();i++){
            data = data + bC.get(i).getCableID()+"\r\n" +
                    bC.get(i).getX_param()+"\t"+
                    bC.get(i).getY_param()+"\t"+
                    bC.get(i).getRot_param()+"\r\n";
        }

        data = data +"no_ground_plane\r\n"+
                    "no_laplace";
        //Create file;
        String file_path = "C:/Users/Randy Quaye/Documents/SACAMOS/MOD/BUNDLE/";
        String file = file_path + b.getBundleID() + ".bundle_spec";

        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            writer.write(data);
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int buildBundle(String filename) {

        String filepath = "\""+"C:\\Users\\Randy Quaye\\Documents\\SACAMOS\\MOD\\BUNDLE\\"+ filename + "\"";
        String cmd1 = "cd C:/Users/Randy Quaye/Documents/SACAMOS/BIN";
        String cmd2 = "cable_bundle_model_builder.exe "+filepath;


        ProcessBuilder builder = new ProcessBuilder(
                "cmd.exe", "/c", cmd1 + "&& "+cmd2);
        builder.redirectErrorStream(true);
        Process p = null;
        try {
            p = builder.start();

            BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line,strLine="";

            while ((line = r.readLine()) != null) strLine = line;

            if(strLine.equals("cable_bundle_model_builder:Finished_Correctly")){
                //Write cable status to 4
                return 4;
            }
            else{ return -1;}
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }


    }


}
