package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.ProviderQueryResult;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.randyquaye.sacamos.sacamos_v1.R;

public class createAccActivity extends AppCompatActivity {

    private Button createButton;
    private Button gotoLogin;
    private EditText newEmail;
    private  EditText newPass;
    private  EditText confPass;
    private ProgressDialog mProgress;

    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseDatabase m_db;
    private DatabaseReference m_dbRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_acc);

        mProgress       = new ProgressDialog(this);

        mAuth           = FirebaseAuth.getInstance();
        mAuthListener   = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();

                if(user !=null){
                    //User is Signed In
                }
                else{
                    //User is signed out
                }
            }
        };

        m_db        = FirebaseDatabase.getInstance();
        m_dbRef     = m_db.getReference().child("Users");
        m_dbRef.keepSynced(true);


        newEmail        =  findViewById(R.id.newEmail);
        newPass         =  findViewById(R.id.newPass);
        confPass        =  findViewById(R.id.confPass);

        createButton    =  findViewById(R.id.createButton);
        gotoLogin       = findViewById(R.id.gotoLoginButton);

        createButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mProgress.setMessage("Creating Account");
                mProgress.show();

                final String email  = newEmail.getText().toString().trim();
                String password     = newPass.getText().toString().trim();
                String pass         = confPass.getText().toString().trim();

                if(!TextUtils.isEmpty(email) && !TextUtils.isEmpty(pass) && !TextUtils.isEmpty(password)){
                    mAuth.fetchProvidersForEmail(email).addOnCompleteListener(new OnCompleteListener<ProviderQueryResult>() {
                        @Override
                        public void onComplete(@NonNull Task<ProviderQueryResult> task) {
                            if(task.isSuccessful()){
                                int exists = task.getResult().getProviders().size();
                                if(exists>0){
                                    Toast.makeText(createAccActivity.this,"User already exists",Toast.LENGTH_LONG).show();

                                    //Redirect to login
                                    Intent intent = new Intent(createAccActivity.this, loginActivity.class);
                                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                    mProgress.dismiss();
                                    startActivity(intent);
                                }
                            }
                        }
                    });
                    if(password.equals(pass)){
                        //Sign User Up
                        mAuth.createUserWithEmailAndPassword(email,password).addOnSuccessListener(new OnSuccessListener<AuthResult>() {
                            @Override
                            public void onSuccess(AuthResult authResult) {
                                if(authResult != null){
                                    String userID = mAuth.getCurrentUser().getUid();
                                    DatabaseReference userDB = m_dbRef.child(userID);

                                    userDB.child("email").setValue(email);

                                    //Open the rest of the application
                                    Intent intent = new Intent(createAccActivity.this, allCablesActivity.class);
                                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                    mProgress.dismiss();
                                    startActivity(intent);
                                    finish();
                                }
                                else {
                                    mProgress.dismiss();
                                    Toast.makeText(createAccActivity.this,"Sign Up Failed",Toast.LENGTH_LONG).show();
                                }
                            }
                        });
                    }
                    else{
                        mProgress.dismiss();
                        Toast.makeText(createAccActivity.this, "Passwords Do Not Match",Toast.LENGTH_LONG).show();
                    }
                }
                else {
                    mProgress.dismiss();
                    Toast.makeText(createAccActivity.this, "All fields are required",Toast.LENGTH_LONG).show();
                }


            }
        });

        gotoLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(createAccActivity.this, loginActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
        // Check if user is signed in (non-null) and update UI accordingly.

    }


    @Override
    public void onStop() {
        super.onStop();
        mAuth.removeAuthStateListener(mAuthListener);
        // Check if user is signed in (non-null) and update UI accordingly.

    }
}
