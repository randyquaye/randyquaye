#ifndef CIRCLE_H_INCLUDED
#define CIRCLE_H_INCLUDED

template<typename T> class Circumcircle{
private:
    T radius;
    Point<T,T> * center;

public:
    Circumcircle();
    Circumcircle(T _r, Point<T,T> * p);
    Circumcircle(const Circumcircle &c);
    ~Circumcircle();

    bool hasVertex(Point<T,T> v);
};

template<typename T>
Circumcircle<T>::Circumcircle(){}

template<typename T>
Circumcircle<T>::Circumcircle(T _r,Point<T,T> * p){
    radius = _r;
    center = p;
}

template<typename T>
Circumcircle<T>::~Circumcircle(){}

template<typename T>
bool Circumcircle<T>::hasVertex(Point<T,T> v){

}




#endif // CIRCLE_H_INCLUDED
