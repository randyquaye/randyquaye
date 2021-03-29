package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.randyquaye.sacamos.sacamos_v1.R;

import Model.CylindricalCable;

public class addCableActivity extends AppCompatActivity {

    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseUser mUser;
    private FirebaseDatabase m_db;
    private DatabaseReference m_dbRef;

    private ProgressDialog mProgress;

    private EditText cableName, b_order, conductivity, cRadius,
            dRadius, b_constant, a_order, permittivity, a_constant, normalisation;

    private ImageView graphicWin;
    private CheckBox checkBox;
    private FloatingActionButton saveButton;


    //Change graphic that is displayed depending on the field that is in focus

    private View.OnFocusChangeListener focusListener = new View.OnFocusChangeListener() {
        public void onFocusChange(View v, boolean hasFocus) {
            if (hasFocus) {
                int id = v.getId();

                switch (id) {
                    case R.id.cableName:
                        graphicWin.setImageResource(R.drawable.cable_default);
                        break;
                    case R.id.cRadius:
                        graphicWin.setImageResource(R.drawable.cable_radius);
                        break;
                    case R.id.dRadius:
                        graphicWin.setImageResource(R.drawable.cable_d_radius);
                        break;
                    case R.id.Conductivity:
                        graphicWin.setImageResource(R.drawable.cable_conductor);
                        break;
                    default:
                        graphicWin.setImageResource(R.drawable.cable_dielectric);
                        break;
                }
            }
        }
    };

    private EditText editList[] = new EditText[10];


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addcable);

        graphicWin      =  findViewById(R.id.graphicWin);
        cableName       =  findViewById(R.id.cableName);
        cRadius         =  findViewById(R.id.cRadius);
        dRadius         =  findViewById(R.id.dRadius);
        conductivity    =  findViewById(R.id.Conductivity);
        permittivity    =  findViewById(R.id.permittivity);
        normalisation   =  findViewById(R.id.normalisation);
        a_order         =  findViewById(R.id.aOrder);
        b_order         =  findViewById(R.id.bOrder);
        a_constant      =  findViewById(R.id.aConstant);
        b_constant      =  findViewById(R.id.bConstant);

        editList[0] = cableName;
        editList[1] = cRadius;
        editList[2] = dRadius;
        editList[3] = conductivity;
        editList[4] = permittivity;
        editList[5] = normalisation;
        editList[6] = a_order;
        editList[7] = b_order;
        editList[8] = a_constant;
        editList[9] = b_constant;

        for (EditText view : editList) {
            view.setOnFocusChangeListener(focusListener);
        }

        checkBox = findViewById(R.id.checkBox2);

        //Enable and disable the normalisation fields if the checkboxes are ticked
        checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

                                                @Override
                                                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                                                    if (checkBox.isChecked()) {
                                                        for (int u = 5; u < 10; u++) {
                                                            editList[u].setEnabled(true);
                                                        }
                                                        editList[4].setEnabled(false);

                                                    } else {
                                                        for (int u = 5; u < 10; u++) {
                                                            editList[u].setEnabled(false);

                                                        }
                                                        editList[4].setEnabled(true);
                                                    }
                                                }
                                            }
        );

        mProgress = new ProgressDialog(this);


        mAuth           = FirebaseAuth.getInstance();
        mAuthListener   = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    //User is Signed In
                } else {
                    //User is signed out
                    Toast.makeText(addCableActivity.this, "Signed Out", Toast.LENGTH_LONG).show();
                }
            }
        };

        mUser           = mAuth.getCurrentUser();
        String userID   = mAuth.getCurrentUser().getUid();

        m_db            = FirebaseDatabase.getInstance();
        m_dbRef         = m_db.getReference().child("Cyl_cables").child(userID);

        m_dbRef.keepSynced(true);


        //Link the floating save button to a variable name
        saveButton =  findViewById(R.id.saveButton);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



        float   _b_order, _conductivity, _cRadius,
                _dRadius, _b_constant, _a_order,
                _permittivity, _a_constant, _normalisation;

        String  _name;

        //Make sure all necessary fields are filled before form submission
        if (!validFields()) {
            customToast("Please make sure all required fields are complete");
        }
        else {

            boolean isFreq = checkBox.isChecked();

            _name     = cableName.getText().toString();
            _cRadius = Float.valueOf(cRadius.getText().toString());
            _dRadius = Float.valueOf(dRadius.getText().toString());


            if (_dRadius < _cRadius) {
                customToast("Dielectric Radius must exceed conductor radius");
            }
            else {

                _conductivity = Float.valueOf(conductivity.getText().toString());

                if (isFreq) {
                    _b_order        = Float.valueOf(b_order.getText().toString());
                    _b_constant     = Float.valueOf(b_constant.getText().toString());
                    _a_order        = Float.valueOf(a_order.getText().toString());
                    _a_constant     = Float.valueOf(a_constant.getText().toString());
                    _permittivity   = _a_constant;
                    _normalisation  = Float.valueOf(normalisation.getText().toString());

                } else {
                    _normalisation  = (float) 1.0;
                    _a_order        = (float) 1.0;
                    _permittivity   = Float.valueOf(permittivity.getText().toString());
                    _a_constant     = _permittivity;
                    _b_order        = (float) 0.0;
                    _b_constant     = (float) 1.0;

                }

                CylindricalCable cyl_cable = new CylindricalCable(_cRadius, _dRadius, _conductivity,
                                                _permittivity, _normalisation,_a_order, _a_constant,
                                                _b_order, _b_constant, _name);

                //Upload Cable Records
                startPosting(cyl_cable);

                //Return to cable list
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        startActivity(new Intent(addCableActivity.this, navActivity.class));
                        finish();
                    }
                }, 1000);
            }
        }
            }
        });


    }

    //Create the cable spec file


    //Function customToast returns void
    //Generate a toast to display a custom message
    //---------Implemented Below-----------------

    public void customToast(String message) {

        LayoutInflater inflater = getLayoutInflater();
        View layout = inflater.inflate(R.layout.custom_toast,
                (ViewGroup) findViewById(R.id.custom_toast_container));

        TextView text = (TextView) layout.findViewById(R.id.text);
        text.setText(message);

        Toast toast = new Toast(getApplicationContext());
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }


    //Function validFields returns boolean
    //Returns true if fields have valid values and false otherwise
    //---------Implemented Below-----------------

    public boolean validFields() {
        boolean valid = true;

        for (int i = 0; i < 4; i++) {
            if (editList[i].getText().toString().isEmpty())
                valid = false;
        }

        if (checkBox.isChecked()) {
            for (int j = 5; j < 10; j++) {
                if (editList[j].getText().toString().isEmpty())
                    valid = false;
            }
        } else {
            if (editList[4].getText().toString().isEmpty())
                valid = false;
        }

        return valid;
    }

    public void startPosting(CylindricalCable cyl_cable) {
        mProgress.setMessage("Uploading Cable File");
        mProgress.show();

        DatabaseReference _dbRef = m_dbRef.push();


        _dbRef.child("status").setValue(0);
        _dbRef.child("file_ref").setValue("none");
        _dbRef.child("cable_spec").setValue(cyl_cable).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                customToast("Cable Saved");
                mProgress.dismiss();
            }
        });



    }
}


//    public static String POST(String url, CylindricalCable cable){
//        InputStream inputStream = null;
//        String result = "";
//        try {
//
//            URL _url = new URL("http://yoururl.com");
//            HttpsURLConnection conn = (HttpsURLConnection) _url.openConnection();
//
//            // 1. create HttpClient
//            HttpClient httpclient = new DefaultHttpClient();
//
//            // 2. make POST request to the given URL
//            HttpPost httpPost = new HttpPost(url);
//
//            String json = "";
//
//            // 3. build jsonObject
//            JSONObject jsonObject = new JSONObject();
//            //Add Cable data to JSONObject
//            jsonObject.accumulate("cableName", cable.getName());
//            jsonObject.accumulate("cRadius", cable.getC_Radius());
//            jsonObject.accumulate("dRadius", cable.getD_Radius());
//            jsonObject.accumulate("conductivity", cable.getC_conductivity());
//            jsonObject.accumulate("permittivity", cable.getPermittivity());
//            jsonObject.accumulate("normalisation", cable.getNormalisation());
//            jsonObject.accumulate("ao", cable.getAo());
//            jsonObject.accumulate("bo", cable.getBo());
//            jsonObject.accumulate("ac", cable.getAc());
//            jsonObject.accumulate("bc", cable.getBc());
//
//            // 4. convert JSONObject to JSON to String
//            json = jsonObject.toString();
//
//            // 5. set json to StringEntity
//            StringEntity se = new StringEntity(json);
//
//            // 6. set httpPost Entity
//            httpPost.setEntity(se);
//
//            // 7. Set some headers to inform server about the type of the content
//            httpPost.setHeader("Accept", "application/json");
//            httpPost.setHeader("Content-type", "application/json");
//
//            // 8. Execute POST request to the given URL
//            HttpResponse httpResponse = httpclient.execute(httpPost);
//
//            // 9. receive response as inputStream
//            inputStream = httpResponse.getEntity().getContent();
//
//            // 10. convert input stream to string
//            if(inputStream != null)
//                result = convertInputStreamToString(inputStream);
//            else
//                result = "Did not work!";
//
//        } catch (Exception e) {
//            Log.d("InputStream", e.getLocalizedMessage());
//        }
//
//        // 11. return result
//        return result;
//    }
//
//    private static String convertInputStreamToString(InputStream inputStream) throws IOException{
//        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
//        String line = "";
//        String result = "";
//        while((line = bufferedReader.readLine()) != null)
//            result += line;
//
//        inputStream.close();
//        return result;
//
//    }












/*    private void writeToFile(String data, Context context, String name) {
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput(name + ".cable_spec", Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        } catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }

    private String readFromFile(Context context, String name) {

        String ret = "";

        try {
            InputStream inputStream = context.openFileInput(name + ".cable_spec");

            if (inputStream != null) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ((receiveString = bufferedReader.readLine()) != null) {
                    stringBuilder.append(receiveString).append("\n");
                }

                inputStream.close();
                ret = stringBuilder.toString();
            }
        } catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }




*/

/**************************Sending POST Data**************************/
/*
    public void postData() {
        // Create a new HttpClient and Post Header
        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httppost = new HttpPost("http://www.yoursite.com/script.php");

        try {
            // Add your data
            List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(2);
            nameValuePairs.add(new BasicNameValuePair("id", "12345"));
            nameValuePairs.add(new BasicNameValuePair("stringdata", "Hi"));
            httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

            // Execute HTTP Post Request
            HttpResponse response = httpclient.execute(httppost);

        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
        } catch (IOException e) {
            // TODO Auto-generated catch block
        }
    }

     */