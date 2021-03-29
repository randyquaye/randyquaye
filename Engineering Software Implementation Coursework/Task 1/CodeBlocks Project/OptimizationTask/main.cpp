#include <iostream>
#include <fstream>
#include <math.h>
#include <stdio.h>
#include <string.h>

using namespace std;

int main(int argc, char* argv[]) {

        const int nx(10000);

        const int ny(200);

        const int nt(200);

        double** vi=new double*[nx];

        double** vr=new double*[nx];

        const double pi_o=(4.*atan(1.)) / double(nx);

        for(int i=0;i<nx;i++)vi[i]=new double[ny];

        for(int i=0;i<nx;i++) {

                vr[i]=new double[ny];
//                memset(vr[i],0.,sizeof(vr[i]));
        }

        for(int i=0;i<nx;i++) {
                const double constant (double(i*i)*sin(pi_o*double(i)));
                for(int j=0;j<ny;j++) vi[i][j]=constant*double(j);
        }


        ofstream fout("data_out");

        for(int t=0;t<nt;t++) {

                cout<<"\n"<<t;cout.flush();

                for (int i = 1; i < nx-1; i++)
                {

                    vr[i][0]=(vi[i+1][0]+vi[i-1][0]+15.45+vi[i][1])*.25;
                    vr[i][199]=(vi[i+1][199]+vi[i-1][199]+vi[i][198]-6.7)*.25;
                }

                for (int i = 1; i < nx-1; i++)
                    for(int j=1; j<ny-1; j++)
                        vr[i][j]=(vi[i+1][j]+vi[i-1][j]+vi[i][j-1]+vi[i][j+1])*.25;

                for(int j=1; j<ny-1; j++)
                {
                    vr[0][j]=(vi[1][j]+10.+vi[0][j-1]+vi[0][j+1])*.25;
                    vr[9999][j]=(5.+vi[9998][j]+vi[9999][j-1]+vi[9999][j+1])*.25;
                }

                for(int i=0;i<nx;i++) {
                        for(int j=0;j<ny;j++) {

                                const int p(i);
                                const int v(j);
                                const double vr_val (fabs(vr[i][j]));
                                const double vi_val (fabs(vi[i][j]));

                                if(fabs(vr_val-vi_val)<1e-2) fout<<"\n"<<t<<" "<<p<<" "<<v<<" "<<vi_val<<" "<<vr_val;
                                vi[i][j]=(vi[i][j]+vr[i][j])*.5;
                        }




                }
        }
}
