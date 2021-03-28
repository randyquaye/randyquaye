#include <vector>
#include <iostream>

using namespace std;

long long fibonacci(int n){

    if(n<=1) return n;

    else{
        vector<long long> series(n+1);

        series[0] = 0;
        series[1] = 1;

        for(int i =2; i<n+1;i++){
            series[i] = (series[i-1]+ series[i-2])%10;
        }

        return series[n];
    }

    

}

int main(){
    int n;
    cin>>n;

    cout<< fibonacci(n);
    return 0;
}