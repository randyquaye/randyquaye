#include <iostream>
#include <fstream>
#include <math.h>

using namespace std;

int main(int argc, char* argv[]) {

    //The next three variables have not been declared as constants even though they are

        int nx(10000);

        int ny(200);

        int nt(200);


        double** vi=new double*[nx];

        double** vr=new double*[nx];

//Another constant below
        double pi=(4.*atan(1.));

        // The following form of memory allocation enables very inefficient memory management
        // because it does not guarantee that the relevant arrays are created in consecutive block of memory
        // A more effective implementation should be considered

        //The two loops below can be combined into one as they have the same limits
        for(int i=0;i<nx;i++) {

                vi[i]=new double[ny];

                vr[i]=new double[ny];

        }


        for(int i=0;i<nx;i++) {

                for(int j=0;j<ny;j++) {

                        //The only term j-dependent part of this equation can be factorised out
                        // and the i-dependent 'constant' can be calculated in the outer loop
                        vi[i][j]=double(i*i)*double(j)*sin(pi/double(nx)*double(i));

                        //Surely there is a faster way of performing this operation outside the iteration
                        vr[i][j]=0.;
                }
        }


        ofstream fout("data_out");

        for(int t=0;t<nt;t++) {

                cout<<"\n"<<t;cout.flush();

                for(int i=0;i<nx;i++) {

                        for(int j=0;j<ny;j++) {

                                //If else statement mean uncertainty inside this for loop; something that should be looked at
                                // Also, the equations used division; change these to multiplications?

                                if(i>0&&i<nx-1&&j>0&&j<ny-1) {

                                        vr[i][j]=(vi[i+1][j]+vi[i-1][j]+vi[i][j-1]+vi[i][j+1])/4.;

                                } else if(i==0&&i<nx-1&&j>0&&j<ny-1) {

                                        vr[i][j]=(vi[i+1][j]+10.+vi[i][j-1]+vi[i][j+1])/4.;

                                } else if(i>0&&i==nx-1&&j>0&&j<ny-1) {

                                        vr[i][j]=(5.+vi[i-1][j]+vi[i][j-1]+vi[i][j+1])/4.;

                                } else if(i>0&&i<nx-1&&j==0&&j<ny-1) {

                                        vr[i][j]=(vi[i+1][j]+vi[i-1][j]+15.45+vi[i][j+1])/4.;

                                } else if(i>0&&i<nx-1&&j>0&&j==ny-1) {

                                        vr[i][j]=(vi[i+1][j]+vi[i-1][j]+vi[i][j-1]-6.7)/4.;

                                }
                        }
                }

                //The two loops can be combined into one as they have the same limits

                for(int i=0;i<nx;i++) {

                        for(int j=0;j<ny;j++) {

                                // fabs(vr[i][j] & fabs(vi[i][j] are calulated and hence looked up twice... this can be fixed with variables
                                //We can try to execute the operation in batches of 8 to make effective use of memory management
                                //The fabs function itself might be an inefficient way of performing this fi statement

                                if(fabs(fabs(vr[i][j])-fabs(vi[i][j]))<1e-2) fout<<"\n"<<t<<" "<<i<<" "<<j<<" "<<fabs(vi[i][j])<<" "<<fabs(vr[i][j]);

                        }
                }

                for(int i=0;i<nx;i++) {

                        //We can try to execute the operation in batches of 8 or 4 to make effective use of memory management//Simple loop optimization
                        for(int j=0;j<ny;j++) vi[i][j]=vi[i][j]/2.+vr[i][j]/2.;

                }
        }
}


