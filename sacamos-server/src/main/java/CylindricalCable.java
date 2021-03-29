


/**
 * Created by Randy Quaye on 04/11/2017.
 */

public class CylindricalCable {

    private float c_Radius, d_Radius, c_conductivity,permittivity,normalisation,ao,ac,bo,bc;

    private String ID = "";
    private String name;

    public CylindricalCable(float c_Radius, float d_Radius, float c_conductivity, float permittivity, float normalisation, float ao, float ac, float bo, float bc,  String name) {

        this.c_Radius = c_Radius;
        this.d_Radius = d_Radius;
        this.c_conductivity = c_conductivity;
        this.permittivity = permittivity;
        this.normalisation = normalisation;
        this.ao = ao;
        this.ac = ac;
        this.bo = bo;
        this.bc = bc;
        this.name = name;
    }

    public CylindricalCable(String ID,float c_Radius, float d_Radius, float c_conductivity, float permittivity, float normalisation, float ao, float ac, float bo, float bc,  String name) {

        this.ID = ID;
        this.c_Radius = c_Radius;
        this.d_Radius = d_Radius;
        this.c_conductivity = c_conductivity;
        this.permittivity = permittivity;
        this.normalisation = normalisation;
        this.ao = ao;
        this.ac = ac;
        this.bo = bo;
        this.bc = bc;
        this.name = name;
    }

    public CylindricalCable() { }

    public CylindricalCable(CylindricalCable c) {
        this.ID = c.getID();
        this.c_Radius = c.getC_Radius();
        this.d_Radius = c.getD_Radius();
        this.c_conductivity = c.getC_conductivity();
        this.permittivity = c.getPermittivity();
        this.normalisation = c.getNormalisation();
        this.ao = c.getAo();
        this.ac = c.getAc();
        this.bo = c.getBo();
        this.bc = c.getBc();
        this.name = c.getName();
    }



    public float getC_Radius() {
        return c_Radius;
    }

    public void setC_Radius(float c_Radius) {
        this.c_Radius = c_Radius;
    }

    public float getD_Radius() {
        return d_Radius;
    }

    public void setD_Radius(float d_Radius) {
        this.d_Radius = d_Radius;
    }

    public float getC_conductivity() {
        return c_conductivity;
    }

    public void setC_conductivity(float c_conductivity) {
        this.c_conductivity = c_conductivity;
    }

    public float getPermittivity() {
        return permittivity;
    }

    public void setPermittivity(float permittivity) {
        this.permittivity = permittivity;
    }

    public float getNormalisation() {
        return normalisation;
    }

    public void setNormalisation(float normalisation) {
        this.normalisation = normalisation;
    }

    public float getAo() {
        return ao;
    }

    public void setAo(float ao) {
        this.ao = ao;
    }

    public float getAc() {
        return ac;
    }

    public void setAc(float ac) {
        this.ac = ac;
    }

    public float getBo() {
        return bo;
    }

    public void setBo(float bo) {
        this.bo = bo;
    }

    public float getBc() {
        return bc;
    }

    public void setBc(float bc) {
        this.bc = bc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

}
