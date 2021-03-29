package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.randyquaye.sacamos.sacamos_v1.R;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import Data.DatabaseHandler;
import Model.CylindricalCable;
import UI.RecyclerViewAdapter;

public class allCablesActivity extends AppCompatActivity {


    private RecyclerView rec_view;
    private RecyclerViewAdapter rec_v_adapter;
    private List<CylindricalCable> cylcables;
    private ProgressDialog mProgress;

    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseUser mUser;
    private FirebaseDatabase m_db;
    private DatabaseReference m_dbRef;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_allcables);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        mProgress = new ProgressDialog(this);
        mAuth = FirebaseAuth.getInstance();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if(user !=null){
                    //User is Signed In
                }
                else{
                    //User is signed out
                    Toast.makeText(allCablesActivity.this,"Signed Out",Toast.LENGTH_LONG).show();
                }
            }
        };

        mUser = mAuth.getCurrentUser();
        String userID = mAuth.getCurrentUser().getUid();

        m_db = FirebaseDatabase.getInstance();
        m_dbRef = m_db.getReference().child("Cyl_cables").child(userID);
        m_dbRef.keepSynced(true);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(mUser != null && mAuth != null)
                InputCable();
            }
        });

        rec_view = findViewById(R.id.recyclerViewID);
        rec_view.setHasFixedSize(true);
        rec_view.setLayoutManager(new LinearLayoutManager(this));


        cylcables = new ArrayList<>();
    }

    @Override
    protected void onStart() {
        mProgress.setMessage("Retrieving Cables");
        mProgress.show();
        super.onStart();
        cylcables = new ArrayList<>();
        m_dbRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                //If any unsolvable problem arises match this to the database structure
                //retreive cable spec child instead of the user id child
                CylindricalCable c = dataSnapshot.getValue(CylindricalCable.class);
                cylcables.add(c);
                Collections.reverse(cylcables);
                rec_v_adapter = new RecyclerViewAdapter(allCablesActivity.this,cylcables);
                rec_view.setAdapter(rec_v_adapter);
                rec_v_adapter.notifyDataSetChanged();
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }


            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
        mProgress.dismiss();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        if(item.getItemId()== R.id.action_signout){
            mAuth.signOut();
            //Go back to login
            Intent intent = new Intent(allCablesActivity.this, loginActivity.class);
            startActivity(intent);
            finish();
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu,menu);
        return super.onCreateOptionsMenu(menu);
    }

    public void InputCable(){
        Intent intent = new Intent(allCablesActivity.this, addCableActivity.class);
        startActivity(intent);
    }


}
