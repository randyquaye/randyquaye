package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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

import Model.CylindricalCable;
import UI.RecyclerViewAdapter;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link cables.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link cables#newInstance} factory method to
 * create an instance of this fragment.
 */
public class cables extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private RecyclerView rec_view;
    private RecyclerViewAdapter rec_v_adapter;
    private List<CylindricalCable> cylcables;
    private ProgressDialog mProgress;

    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseUser mUser;
    private FirebaseDatabase m_db;
    private DatabaseReference m_dbRef;

    private FloatingActionButton fab;

    private OnFragmentInteractionListener mListener;

    public cables() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment cables.
     */
    // TODO: Rename and change types and number of parameters
    public static cables newInstance(String param1, String param2) {
        cables fragment = new cables();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }




    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view  = inflater.inflate(R.layout.fragment_cables, container, false);
        fab =  view.findViewById(R.id.fab);
        rec_view = view.findViewById(R.id.recyclerViewID);
        mProgress = new ProgressDialog(this.getContext());
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
                    Toast.makeText(getContext(),"Signed Out",Toast.LENGTH_LONG).show();
                }
            }
        };

        mUser = mAuth.getCurrentUser();
        String userID = mAuth.getCurrentUser().getUid();

        m_db = FirebaseDatabase.getInstance();
        m_dbRef = m_db.getReference().child("Cyl_cables").child(userID);
        m_dbRef.keepSynced(true);


        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(mUser != null && mAuth != null)
                    InputCable();
            }
        });


        rec_view.setHasFixedSize(true);
        rec_view.setLayoutManager(new LinearLayoutManager(this.getContext()));
        return view;

    }

    public void InputCable(){
        Intent intent = new Intent(this.getContext(), addCableActivity.class);
        startActivity(intent);
    }

    @Override
    public void onStart() {
        mProgress.setMessage("Retrieving Cables");
        mProgress.show();
        super.onStart();
        cylcables = new ArrayList<>();
        m_dbRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                CylindricalCable c = dataSnapshot.child("cable_spec").getValue(CylindricalCable.class);
                cylcables.add(c);
                Collections.reverse(cylcables);
                rec_v_adapter = new RecyclerViewAdapter(getContext(),cylcables);
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

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }

}
