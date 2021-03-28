#include <iostream>

using namespace std;

long gcd(long a, long b){
    if(b==0 ) {return a;}

    else{
        long rem = a%b;
        return gcd(b,rem);
    }
    
}

long lcm(long a, long b){
    return (a*b)/gcd(a,b);
}

int main(){
    long a,b;

    cin >> a >> b;

    cout<<lcm(a,b);

    return 0;
}