#include <iostream>
#include <fstream>
#include <stdio.h>
#include <sys/time.h>
#include <vector>

using namespace std;

int main()
{
    struct timeval start_time,end_time;



    ofstream fout("data_0_20k.csv");

    //loop to change the value of N
    for(int n=0; n<=400; n++) //Change the limit of  the loop depending on what value of N max is desired
    {

        const int N (50 * n);
        double * a  = new double[N];
        double * b  = new double[N];
        double * c  = new double[N];

        for(int i=0; i<N; i++)
        {
            b[i] = c[i] = (double) i;
        }


        gettimeofday(&start_time,NULL);

        // Your code to time

        for(int t = 0;t<5;t++)
            for(int i=0; i<N; i++)
                a[i]=b[i]+c[i];

        gettimeofday(&end_time,NULL);
        fout<<N<<","<<end_time.tv_sec - start_time.tv_sec+(end_time.tv_usec-start_time.tv_usec)/1e6<<"\n";

        //Spit some CSV or something here
        cout<<"\n\ngettimeofday wall time="<<
            end_time.tv_sec - start_time.tv_sec+(end_time.tv_usec-start_time.tv_usec)/1e6;

    }

    return 0;
}




