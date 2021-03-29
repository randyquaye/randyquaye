

/**
 * Created by Randy Quaye on 03/03/2018.
 */

public class BundleComponent{
    private String cableID,cableName;
    private float x_param;
    private float y_param;
    private float rot_param;



    public BundleComponent(float _x, float _y, float _rot, String name, String ID){
        x_param = _x;
        y_param = _y;
        rot_param = _rot;
        cableID = ID;
        cableName = name;
    }

    public BundleComponent(){}

    public float getX_param() {
        return x_param;
    }

    public void setX_param(float x_param) {
        this.x_param = x_param;
    }

    public float getY_param() {
        return y_param;
    }

    public String getCableID() {
        return cableID;
    }

    public void setCableID(String cableID) {
        this.cableID = cableID;
    }

    public String getCableName() {
        return cableName;
    }

    public void setCableName(String cableName) {
        this.cableName = cableName;
    }

    public void setY_param(float y_param) {
        this.y_param = y_param;
    }

    public float getRot_param() {
        return rot_param;
    }

    public void setRot_param(float rot_param) {
        this.rot_param = rot_param;
    }

}
