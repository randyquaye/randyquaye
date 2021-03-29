#include <iostream>
#include <fstream>
#include <stdio.h>
#include <sys/time.h>
#include <vector>

using namespace std;

int main()
{
    struct timeval start_time,end_time;



    ofstream fout("data_offset_450k_o.csv");

    //loop to change the value of N


        const int N (450000);//Variable N for the
        double * a  = new double[N];
        double * b  = new double[N];
        double * c  = new double[N];

        for(int i=0; i<N; i++)
        {
            b[i] = c[i] = (double) i;
        }

        for (int offset=0;offset<N;offset+=100){


        gettimeofday(&start_time,NULL);

        // Your code to time

        for(int t = 0;t<10;t++)
            for(int i=0; i<N-offset; i++)
                a[i]=b[i]+c[i+offset];

        gettimeofday(&end_time,NULL);
        fout<<offset<<","<<end_time.tv_sec - start_time.tv_sec+(end_time.tv_usec-start_time.tv_usec)/1e6<<"\n";

        //Spit some CSV or something here
        cout<<"\n\ngettimeofday wall time="<<
            end_time.tv_sec - start_time.tv_sec+(end_time.tv_usec-start_time.tv_usec)/1e6;

        }
    return 0;
}




