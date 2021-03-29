#include <iostream>

using namespace std;

template<typename T> class rangeNumber{

public:
    rangeNumber(T _lower,T _upper);
    rangeNumber(T _static);
    rangeNumber();
    rangeNumber( const rangeNumber &rN);  // copy constructor
    ~rangeNumber();

    //Operator overloading for +,-,= and +=
    //Note that there are implementations that
    //cater for combining range numbers to
    //normal int, float, double e.t.c
    rangeNumber operator+(const rangeNumber<T>&);
    rangeNumber operator+(const T&);

    rangeNumber operator-(const rangeNumber<T>&);
    rangeNumber operator-(const T&);

    rangeNumber operator=(const rangeNumber<T>&);
    rangeNumber operator=(const T&);

    rangeNumber operator+=(const rangeNumber<T>&);
    rangeNumber operator+=(const T&);

    // * and / Useful for scaling ranges
    rangeNumber operator*(const rangeNumber<T>&);
    rangeNumber operator/(const rangeNumber<T>&);

    rangeNumber operator*(const T&);
    rangeNumber operator/(const T&);


    //Add operation for adding floats and other native types to the range

    //Friend implementation for printing range numbers
    //as well as comparisons with >,<
    friend bool operator<(rangeNumber<T> const& rN, const T& number){
        if(rN.upper < number)return true;
        else{return false;}
    }

    friend bool operator>(rangeNumber<T> const& rN, const T& number){
        if(rN.lower > number)return true;
        else{return false;}
    }

    //Input and Output Stream Operators
    friend ostream &operator<<( ostream &output, const rangeNumber &rN ) {
         output << rN.lower << " : " << rN.upper;
         return output;
      }
    friend istream &operator>>(istream &input, rangeNumber &rN ) {
        T temp1, temp2;
         cout<<"Enter Lower Number: ";
         input >> temp1;
         cout<<"Enter upper Number: ";
         input >> temp2;
         //Make Sure numbers
         rN.lower = temp1<temp2?temp1:temp2;
         rN.upper = temp1>temp2?temp1:temp2;
         return input;
      }

    //MEMBER FUNCTIONS
    T  getAverage(){return (upper+lower)/2;}        //RETURNS MIDPOINT OF RANGE
    T  getGap(){return upper-lower;}                //RETURNS LENGTH OF RANGE


    //GETTERS AND SETTERS FOR PRIVATE VARIABLE
    T getUpper(){return upper;}
    void setUpper(T _upper){upper = _upper;}

    T getLower(){return lower;}
    void setLower(T _lower){lower= _lower;}//Ask about swapping

private:

    T upper,lower;
};

//DEFINITION OF CLASS FUNCTIONS
template<typename T>
rangeNumber<T>::rangeNumber(T _lower,T _upper){
        lower = _lower<_upper?_lower:_upper;
        upper = _lower>_upper?_lower:_upper;
}

template<typename T>
rangeNumber<T>::rangeNumber(T _static){
        lower = _static;
        upper = _static;
}

template<typename T>
rangeNumber<T>::rangeNumber(){

}

template<typename T>
rangeNumber<T>::rangeNumber(const rangeNumber<T> &rN){
    upper = rN.upper;
    lower = rN.lower;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator+(const rangeNumber<T> &rN){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    rN2->upper = this->upper + rN.upper;
    rN2->lower = this->lower + rN.lower;

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator+(const T &number){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    rN2->upper = this->upper + number;
    rN2->lower = this->lower + number;

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator-(const rangeNumber<T> &rN){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    rN2->upper = this->upper - rN.lower;
    rN2->lower = this->lower - rN.upper;

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator-(const T &number){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    rN2->upper = this->upper - number;
    rN2->lower = this->lower - number;

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator=(const rangeNumber<T> &rN){
    this->upper = rN.upper;
    this->lower = rN.lower;

    return *this;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator=(const T &rN){
    this->upper = rN;
    this->lower = rN;

    return *this;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator+=(const rangeNumber<T> &rN){
    this->upper += rN.upper;
    this->lower += rN.lower;

    return *this;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator+=(const T &rN){
    this->upper += rN;
    this->lower += rN;

    return *this;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator/(const rangeNumber<T> &rN){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    const T a(this->getUpper());
    const T b(this->getLower());

    const T c(rN.upper);
    const T d(rN.lower);

    //Implement Sorting Network to find the appropriate values
    T a_list[4] = {a/c,a/d,b/c,b/d };

    if(a_list[0]>a_list[1])swap(a_list[0],a_list[1]);
    if(a_list[2]>a_list[3])swap(a_list[2],a_list[3]);
    if(a_list[0]>a_list[2])swap(a_list[0],a_list[2]);
    if(a_list[1]>a_list[3])swap(a_list[1],a_list[3]);
    if(a_list[1]>a_list[2])swap(a_list[1],a_list[2]);

    rN2->upper = a_list[3];
    rN2->lower = a_list[0];
    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator*(const rangeNumber &rN){
    rangeNumber<T> * rN2 = new rangeNumber<T>();

    const T a(this->getUpper());
    const T b(this->getLower());

    const T c(rN.upper);
    const T d(rN.lower);

    //Similar implementation of sorting network
    T a_list[4] = {a*c,a*d,b*c,b*d};

    if(a_list[0]>a_list[1])swap(a_list[0],a_list[1]);
    if(a_list[2]>a_list[3])swap(a_list[2],a_list[3]);
    if(a_list[0]>a_list[2])swap(a_list[0],a_list[2]);
    if(a_list[1]>a_list[3])swap(a_list[1],a_list[3]);
    if(a_list[1]>a_list[2])swap(a_list[1],a_list[2]);

    rN2->upper = a_list[3];
    rN2->lower = a_list[0];

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator/(const T &N){
    rangeNumber<T> * rN2 = new rangeNumber<T>();

    const T a(this->getUpper());
    const T b(this->getLower());


    rN2->upper = max(a/N, b/N);
    rN2->lower = min(a/N, b/N);

    return *rN2;
}

template<typename T>
rangeNumber<T> rangeNumber<T>::operator*(const T &N){
    rangeNumber<T> * rN2 = new rangeNumber<T>();
    const T a(this->getUpper());
    const T b(this->getLower());

    rN2->upper = max(a*N, b*N);
    rN2->lower = min(a*N, b*N);

    return *rN2;
}

template<typename T>
rangeNumber<T>::~rangeNumber(){}


//Three overloads to swap operations in the form 'native type (operator) rangenumber' eg 3 * 5:6, 3+ 5:6, 3-5:6;

template<typename T,typename U> rangeNumber<U>  operator+(const T & Left, const rangeNumber<U> & Right){

        rangeNumber<U> temp_result(Right);
        temp_result +=  Left;

        return temp_result;
}

template<typename T,typename U> rangeNumber<U>  operator-(const T & Left, const rangeNumber<U> & Right){

        rangeNumber<U> temp_result(Right);
        U low = Left - temp_result.getUpper();
        U high = Left - temp_result.getLower();

        temp_result.setUpper(high);
        temp_result.setLower(low);

        return temp_result;
}
template<typename T,typename U> rangeNumber<U>  operator*(const T & Left, const rangeNumber<U> & Right){

        rangeNumber<U> temp_result(Right);

        U low = min(Left * temp_result.getUpper(), Left * temp_result.getLower());
        U high = max(Left * temp_result.getUpper(), Left * temp_result.getLower());

        temp_result.setUpper(high);
        temp_result.setLower(low);

        return temp_result;
}
