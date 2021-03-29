package UI;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.randyquaye.sacamos.sacamos_v1.Activities.addCableActivity;
import com.randyquaye.sacamos.sacamos_v1.Activities.viewCableActivity;
import com.randyquaye.sacamos.sacamos_v1.R;

import java.util.List;

import Data.DatabaseHandler;
import Model.CylindricalCable;

import static android.content.ContentValues.TAG;

/**
 * Created by Randy Quaye on 11/11/2017.
 */

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

    private Context context;
    private List<CylindricalCable> cylcables;



    public RecyclerViewAdapter(Context context, List<CylindricalCable> cylcables) {
        this.context = context;
        this.cylcables = cylcables;
    }

    @Override
    public RecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.activity_listrow,parent,false);

        return new ViewHolder(view,context);
    }

    @Override
    public void onBindViewHolder(RecyclerViewAdapter.ViewHolder holder, int position) {
            CylindricalCable cable = cylcables.get(position);
            holder.cableName.setText(cable.getName());
            holder.cableID.setText(Integer.toString(position+1));
            holder.cableType.setText("Cylindrical Cable");
    }

    @Override
    public int getItemCount() {
        return cylcables.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public TextView cableName;
        public TextView cableType;
        public TextView cableID;
        public ImageButton delete;

        public int ID;

        public ViewHolder(View view, Context ctx) {
            super(view);
            context = ctx;

            cableName = (TextView) view.findViewById(R.id.cableName);
            cableType = (TextView) view.findViewById(R.id.cableType);
            cableID = (TextView) view.findViewById(R.id.cableID);
            delete = (ImageButton) view.findViewById(R.id.deleteCable);

            //Deleting Cable
            delete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    int position = getAdapterPosition();
                    CylindricalCable cable = cylcables.get(position);
                    final String name = cable.getName();

                    DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            switch (which){
                                case DialogInterface.BUTTON_POSITIVE:
                                    //Yes button clicked
                                    ProgressDialog mProgress = new ProgressDialog(context);


                                    FirebaseAuth mAuth = FirebaseAuth.getInstance();
                                    FirebaseAuth.AuthStateListener mAuthListener = new FirebaseAuth.AuthStateListener() {
                                        @Override
                                        public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                                            FirebaseUser user = firebaseAuth.getCurrentUser();
                                            if (user != null) {
                                                //User is Signed In
                                            } else {
                                                //User is signed out
                                            }
                                        }
                                    };

                                    FirebaseUser mUser = mAuth.getCurrentUser();
                                    String userID = mAuth.getCurrentUser().getUid();

                                    FirebaseDatabase m_db = FirebaseDatabase.getInstance();
                                    DatabaseReference m_dbRef = m_db.getReference().child("Cyl_cables").child(userID);
                                    m_dbRef.keepSynced(true);

                                    Query cableQuery = m_dbRef.orderByChild("name").equalTo(name);

                                    cableQuery.addListenerForSingleValueEvent(new ValueEventListener() {
                                        @Override
                                        public void onDataChange(DataSnapshot dataSnapshot) {
                                            for (DataSnapshot cableSnapshot: dataSnapshot.getChildren()) {
                                                cableSnapshot.getRef().removeValue();
                                            }
                                        }

                                        @Override
                                        public void onCancelled(DatabaseError databaseError) {
                                            Log.e(TAG, "onCancelled", databaseError.toException());
                                        }
                                    });
                                    cylcables.remove(getAdapterPosition());
                                    notifyItemRemoved(getAdapterPosition());

                                    break;

                                case DialogInterface.BUTTON_NEGATIVE:
                                    //No button clicked
                                    break;
                            }
                        }
                    };

                    AlertDialog.Builder builder = new AlertDialog.Builder(context);
                    builder.setMessage("Are you sure you want to delete this cable?").setPositiveButton("Yes", dialogClickListener)
                            .setNegativeButton("No", dialogClickListener).show();


                }
            });

            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int position = getAdapterPosition();

                    CylindricalCable cable = cylcables.get(position);
                    Intent intent = new Intent(context, viewCableActivity.class);
                    intent.putExtra("cableName", cable.getName());
                    intent.putExtra("cRadius", cable.getC_Radius());
                    intent.putExtra("dRadius", cable.getD_Radius());
                    intent.putExtra("conductivity", cable.getC_conductivity());
                    intent.putExtra("permittivity", cable.getPermittivity());
                    intent.putExtra("normalisation", cable.getNormalisation());
                    intent.putExtra("ao", cable.getAo());
                    intent.putExtra("bo", cable.getBo());
                    intent.putExtra("ac", cable.getAc());
                    intent.putExtra("bc", cable.getBc());
                    context.startActivity(intent);
                }
            });
        }

        @Override
        public void onClick(View v) {

        }
    }
}
