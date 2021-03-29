
#include <iostream>
#include <sstream>
#include <string>
#include <vector>


template<typename T> class Function
{
private:

public:
    Function();
    double operator()(Point<T,T> *p);

};


template<typename T>
Function<T>::Function(){}

template<typename T>
double Function<T>::operator()(Point<T,T> *p){
    //define Function behaviour here;

    double x = p->getX();
    double y = p->getY();

    return 5*x + 3*y;
}
