package com.randyquaye.sacamos.sacamos_v1.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.randyquaye.sacamos.sacamos_v1.R;

public class viewCableActivity extends AppCompatActivity {

    private TextView cableName,cableType,cRadius,dRadius,conductivity,
                     frequency,normalisation,ao,ac,bo,bc;
    private int cableID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_viewcable);

        cableName = (TextView) findViewById(R.id.cable_name_lbl);
        cableType = (TextView) findViewById(R.id.cableType_lbl);
        cRadius = (TextView) findViewById(R.id.cRadius_lbl);
        dRadius = (TextView) findViewById(R.id.dRadius_lbl);
        conductivity = (TextView) findViewById(R.id.conductivity_lbl);
//        frequency = (TextView) findViewById(R.id.isFreq_lbl);
        normalisation = (TextView) findViewById(R.id.normalisation_lbl);
        ao= (TextView) findViewById(R.id.aOrder_lbl);
        ac = (TextView) findViewById(R.id.aConstant_lbl);
        bo= (TextView) findViewById(R.id.bOrder_lbl);
        bc = (TextView) findViewById(R.id.bConstant_lbl);


        Bundle bundle = getIntent().getExtras();

        if(bundle != null){
            cableName.setText(bundle.getString("cableName"));
            cableType.setText("Cylindrical Cable");
            cRadius.setText("Conductor Radius: " + bundle.getFloat("cRadius"));
            dRadius.setText("Conductor Radius: " + bundle.getFloat("dRadius"));
            conductivity.setText("Conductivity: " + bundle.getFloat("conductivity"));
//            frequency.setText("Frequency Dependent: " + (bundle.getBoolean("freq") ? "Yes":"No"));
            normalisation.setText("Normalisation : " + bundle.getFloat("normalisation"));
            ao.setText("A (Order) : " + bundle.getFloat("ao"));
            ac.setText("A (Constant) : " + bundle.getFloat("ac"));
            bo.setText("B (Order) : " + bundle.getFloat("bo"));
            bc.setText("B (Constant) : " + bundle.getFloat("bc"));
            cableID = bundle.getInt("id");
        }
    }
}
