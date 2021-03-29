package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputType;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.randyquaye.sacamos.sacamos_v1.R;


public class loginActivity extends AppCompatActivity
{

    private Button loginButton;
    private Button gotoCreate;
    private Button resetPass;
    private EditText loginEmail;
    private  EditText loginPass;
    private ProgressDialog mProgress;

    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mProgress = new ProgressDialog(this);

        loginEmail =  findViewById(R.id.loginEmail);
        loginPass  =  findViewById(R.id.loginPass);

        loginButton =  findViewById(R.id.loginButton);
        gotoCreate =   findViewById(R.id.gotoCreateButton);
        resetPass =   findViewById(R.id.forgotPass);

        mAuth = FirebaseAuth.getInstance();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();

                if(user !=null){//User is Signed In
                }
                else {//User Is Signed Out
                }
            }
        };

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mProgress.setMessage("Logging In");
                mProgress.show();
                String email = loginEmail.getText().toString().trim();
                String password = loginPass.getText().toString().trim();

                if(!TextUtils.isEmpty(email) && !TextUtils.isEmpty(password)){

                    //Sign User in Using Credentials
                    mAuth.signInWithEmailAndPassword(email,password).addOnCompleteListener(loginActivity.this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            //Failed Sign In
                            if(!task.isSuccessful()){
                                mProgress.dismiss();
                                Toast.makeText(loginActivity.this,"Sign In Failed",Toast.LENGTH_LONG).show();
                            }
                            else{
                                mProgress.dismiss();
                                //Open the rest of the application
                                Intent intent = new Intent(loginActivity.this, navActivity.class);
                                startActivity(intent);
                                finish();
                            }
                        }
                    });
                }


            }
        });

        //Change activity to create account
        gotoCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(loginActivity.this, createAccActivity.class);
                startActivity(intent);
                finish();
            }
        });

        resetPass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String email = loginEmail.getText().toString();
                if(!TextUtils.isEmpty(email)){
                    mProgress.setMessage("Logging In");
                    mProgress.show();
                    FirebaseAuth.getInstance().sendPasswordResetEmail(email)
                            .addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if (task.isSuccessful()) {
                                        Toast.makeText(loginActivity.this,"Email Sent has been sent to "+ email,Toast.LENGTH_LONG).show();
                                    }
                                }
                            });
                    mProgress.dismiss();
                }

                else {

                    AlertDialog.Builder builder = new AlertDialog.Builder(loginActivity.this);
                    builder.setTitle("Enter Email");

// Set up the input
                    final EditText input = new EditText(loginActivity.this);

// Specify the type of input expected; this, for example, sets the input as a password, and will mask the text
                    input.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
                    builder.setView(input);

// Set up the buttons
                    builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            final String emails = input.getText().toString().trim();
                            if(!TextUtils.isEmpty(emails)){
                                mProgress.setMessage("Logging In");
                                mProgress.show();
                                FirebaseAuth.getInstance().sendPasswordResetEmail(emails)
                                        .addOnCompleteListener(new OnCompleteListener<Void>() {
                                            @Override
                                            public void onComplete(@NonNull Task<Void> task) {
                                                if (task.isSuccessful()) {
                                                    Toast.makeText(loginActivity.this,"Email Sent has been sent to "+ emails,Toast.LENGTH_LONG).show();
                                                }
                                            }
                                        });
                                mProgress.dismiss();
                            }
                        }
                    });
                    builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    });

                    builder.show();

                }

            }
        });


    }


    @Override
    public void onStart() {
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if(currentUser!=null){
            mProgress.setMessage("Logging In");
            mProgress.show();
            Intent intent = new Intent(loginActivity.this, navActivity.class);
            startActivity(intent);
            finish();
            mProgress.dismiss();
        }

    }


    @Override
    public void onStop() {
        super.onStop();
        mAuth.removeAuthStateListener(mAuthListener);
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();

    }
}

