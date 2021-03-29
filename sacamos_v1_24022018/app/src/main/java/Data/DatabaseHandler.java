package Data;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.design.widget.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

import Model.CylindricalCable;
import Util.Util;

/**
 * Created by Randy Quaye on 04/11/2017.
 */

public class DatabaseHandler extends SQLiteOpenHelper{

    public DatabaseHandler(Context context) {
        super(context,Util.DATABASE_NAME, null, Util.DATABASE_VERSION);
    }

    //Create Tables
    @Override
    public void onCreate(SQLiteDatabase db) {

        String CREATE_CYL_CABLE_TABLE = "CREATE TABLE " + Util.TABLE_NAME + "( " +
                Util.KEY_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " + Util.KEY_NAME + " TEXT, " +
                Util.KEY_C_RADIUS + " FLOAT, " + Util.KEY_D_RADIUS + " FLOAT, " +
                Util.KEY_CONDUCTIVITY + " FLOAT, " + Util.KEY_PERMITTIVITY + " FLOAT, " + Util.KEY_NORMALISATION + " FLOAT, "  + Util.KEY_AO + " FLOAT, " +
                Util.KEY_AC + " FLOAT, " + Util.KEY_BO + " FLOAT, " + Util.KEY_BC + " FLOAT ) ";

        db.execSQL(CREATE_CYL_CABLE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        //DELETING OLD TABLE
        db.execSQL("DROP TABLE IF EXISTS " + Util.TABLE_NAME);

        //Create the table again
        onCreate(db);
    }

    //Add CylCable
    public  void addCylCable(CylindricalCable c){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues value = new ContentValues();
        value.put(Util.KEY_NAME, c.getName());
        value.put(Util.KEY_C_RADIUS, c.getC_Radius());
        value.put(Util.KEY_D_RADIUS, c.getD_Radius());
        value.put(Util.KEY_CONDUCTIVITY, c.getC_conductivity());
        value.put(Util.KEY_PERMITTIVITY, c.getPermittivity());
        value.put(Util.KEY_NORMALISATION, c.getNormalisation());
        value.put(Util.KEY_AO, c.getAo());
        value.put(Util.KEY_AC, c.getAc());
        value.put(Util.KEY_BO, c.getBo());
        value.put(Util.KEY_BC, c.getBc());
//Todo:Add date inserted
        db.insert(Util.TABLE_NAME,null,value);
        db.close();
    }

    public  CylindricalCable getCylCable(String name){
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(Util.TABLE_NAME, new String[]{
                Util.KEY_ID, Util.KEY_NAME,Util.KEY_C_RADIUS, Util.KEY_D_RADIUS,Util.KEY_CONDUCTIVITY,
                Util.KEY_PERMITTIVITY,Util.KEY_NORMALISATION,Util.KEY_AO,Util.KEY_AC,Util.KEY_BO, Util.KEY_BC},
                Util.KEY_NAME +"=?", new String[]{name},null,null, null,null);

                if(cursor != null){
                    cursor.moveToFirst();
                }

                CylindricalCable c = new CylindricalCable(Float.valueOf(cursor.getString(2)),Float.valueOf(cursor.getString(3)),
                        Float.valueOf(cursor.getString(4)),Float.valueOf(cursor.getString(5)),Float.valueOf(cursor.getString(6)),Float.valueOf(cursor.getString(7)),
                        Float.valueOf(cursor.getString(8)),Float.valueOf(cursor.getString(9)),Float.valueOf(cursor.getString(10)),cursor.getString(1));

        cursor.close();
        db.close();
                return c;
    }


    public List<CylindricalCable> getAllCylindricalCables(){
        SQLiteDatabase db = this.getReadableDatabase();
        List<CylindricalCable> cyl_cables  = new ArrayList<>();

        String selectAll = "SELECT * FROM " + Util.TABLE_NAME;
        Cursor cursor = db.rawQuery(selectAll, null);

        //Loop through cables

        if(cursor.moveToFirst()){
            do{
                CylindricalCable cyl_cable = new CylindricalCable();
                cyl_cable.setName(cursor.getString(1));
                cyl_cable.setC_Radius(Float.valueOf(cursor.getString(2)));
                cyl_cable.setD_Radius(Float.valueOf(cursor.getString(3)));
                cyl_cable.setC_conductivity(Float.valueOf(cursor.getString(4)));
                cyl_cable.setPermittivity(Float.valueOf(cursor.getString(5)));
//                cyl_cable.setFrequency(Boolean.parseBoolean(cursor.getString(6)));
                cyl_cable.setNormalisation(Float.valueOf(cursor.getString(6)));
                cyl_cable.setAo(Float.valueOf(cursor.getString(7)));
                cyl_cable.setAc(Float.valueOf(cursor.getString(8)));
                cyl_cable.setBo(Float.valueOf(cursor.getString(9)));
                cyl_cable.setBc(Float.valueOf(cursor.getString(10)));

                //add cable to list
                cyl_cables.add(cyl_cable);
            }while(cursor.moveToNext());
        }

        return cyl_cables;

    }

    public void deleteCylCable(String name){
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(Util.TABLE_NAME, Util.KEY_NAME + " = ?",new String[]{name});

        db.close();
    }

}
