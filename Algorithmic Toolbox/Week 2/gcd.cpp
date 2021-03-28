#include <iostream>

using namespace std;

long gcd(long a, long b){
    if(b==0 ) {return a;}

    else{
        long rem = a%b;
        return gcd(b,rem);
    }
    
    
}

int main(){

    long a,b;

    cin>>a>>b;

    cout<< gcd(a,b);

    return 0;
}