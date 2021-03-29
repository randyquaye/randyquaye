#include <iostream>
#include "rangeNumber.h"

using namespace std;

int main()
{
    rangeNumber<float> r1(0.,0.);
    rangeNumber<float> r2(0.,0.);
    rangeNumber<float> r3();

    //Testing input stream operator overload
    cout<<"\nFirst Number (R1)\n";
    cin>>r1;
    cout<<"\nSecond Number (R2)\n";
    cin>>r2;

    rangeNumber<float> temp_result(r1); //Testing copy constructor

    //Test All Implemented Arithmetic Operations as well as ostream operator overload
    cout<<"\nR1 + R2 = " << r1 +r2 <<"\n";
    cout<<"R1 - R2 = " << r1 -r2<<"\n";
    cout<<"R1 + 1.3 = " << r1 + 1.3<<"\n";
    cout<<"R1 - 1.3 = " << r1 - 1.3<<"\n";
    cout<<"R1 * R2 = " << r1 *r2<<"\n";
    cout<<"R1 / R2 = " << r1 /r2<<"\n";
    cout<<"R1 / -2.6 = " << r1/-2.6<<"\n";
    cout<<"R2 * -2.6 = " << r1*-2.6<<"\n";
    cout<<"2.6 * R1 = " << 2.6*r1<<"\n";
    cout<<"5.2 + R1 = " << 5.2 + r1<<"\n";
    cout<<"5 - R1 = " << 5 - r1<<"\n";

    //Test boolean comparisons
    bool test = r1<3.6;
    cout<<"R1 < 3.9 = " << boolalpha<< test<<"\n";
    test = r1>3.6;
    cout<<"R2 > 3.9 = " << test<<"\n";

    //Test out special operator
    temp_result+=1;
    cout<<"R1 += 1 means R1 is now " << temp_result<<"\n\n";

    //Test out Member Functions
    cout<< "I also know that the lower value of R1 is "<<r1.getLower()<< " and the upper value of R2 is "<<r2.getUpper();
    cout<<"\nR1 has a mid-point of "<<r1.getAverage() <<" and R2 has a range of "<<r2.getGap()<<"\n\n";

    rangeNumber<float> simple(5); //One number used to initialize range range
    cout<<"I can also initialise a static rangenumber with a value of "<< simple<< " for example to represent number 5\n\n";
    simple = 0.2;       //range just equated to native type
    cout<<"And later equate it to 0.2 for a new value of "<< simple<<"\n\n";



    return 0;
}
