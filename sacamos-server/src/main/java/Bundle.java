

import java.util.ArrayList;

/**
 * Created by Randy Quaye on 03/03/2018.
 */

public class Bundle {
    private int number_of_params;
    private String bundleName;
    private String bundleID;
    private ArrayList<BundleComponent> components;

    public Bundle(int n, String name){
        this.number_of_params = n;
        this.bundleID = "";
        this.bundleName = name;
    }

    public Bundle(int n, String name, String ID){
        this.number_of_params = n;
        this.bundleID = ID;
        this.bundleName = name;
    }

    public Bundle(int n, String name, String ID, ArrayList<BundleComponent> c){
        this.number_of_params = n;
        this.bundleID = ID;
        this.bundleName = name;
        this.components = new ArrayList<>();

        for(BundleComponent bC:c){
            BundleComponent component = new BundleComponent();
            component.setCableName(bC.getCableName());
            component.setCableID(bC.getCableID());
            component.setRot_param(bC.getRot_param());
            component.setX_param(bC.getX_param());
            component.setY_param(bC.getY_param());
            this.components.add(component);
        }
    }

    public Bundle(int n, String name, ArrayList<BundleComponent> c){
        this.number_of_params = n;
        this.bundleID = "";
        this.bundleName = name;
        this.components = new ArrayList<>();

        for(BundleComponent bC:c){
            BundleComponent component = new BundleComponent();
            component.setCableName(bC.getCableName());
            component.setCableID(bC.getCableID());
            component.setRot_param(bC.getRot_param());
            component.setX_param(bC.getX_param());
            component.setY_param(bC.getY_param());
            this.components.add(component);
        }
    }


    public Bundle(){}

    public String getBundleName() {
        return bundleName;
    }

    public void setBundleName(String bundleName) {
        this.bundleName = bundleName;
    }

    public String getBundleID() {
        return bundleID;
    }

    public void setBundleID(String bundleID) {
        this.bundleID = bundleID;
    }

    public int getNumber_of_params() {
        return number_of_params;
    }

    public void setNumber_of_params(int number_of_params) {
        this.number_of_params = number_of_params;
    }

    public ArrayList<BundleComponent> getComponents() {
        return components;
    }

    public void setComponents(ArrayList<BundleComponent> c) {
        this.components = new ArrayList<>();

        for(BundleComponent bC:c){
            BundleComponent component = new BundleComponent();
            component.setCableName(bC.getCableName());
            component.setCableID(bC.getCableID());
            component.setRot_param(bC.getRot_param());
            component.setX_param(bC.getX_param());
            component.setY_param(bC.getY_param());
            this.components.add(component);
        }
    }

}
