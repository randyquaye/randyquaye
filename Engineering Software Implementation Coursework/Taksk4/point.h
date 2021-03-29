#include <iostream>
#include <sstream>
#include <string>
#include <vector>


using namespace std;

template<typename T, typename U>  class Point{

public:

    //Constructors
    Point();
    Point(string _data);
    Point(int _index, T _x, T _y, vector<U> _attr);
    Point(T _x,T _y);
    Point(const Point<T,U> & p);
   ~Point();

    Point operator=(const Point<T,U>&);


   //File Stream
    friend ostream &operator<<( ostream &output, const Point<T,U> &p ) {

         output << p.x << " " << p.y;

         if(!p.attr.empty()){

            for (typename  vector<U>::const_iterator i = p.attr.begin(); i != p.attr.end(); ++i)
                    cout <<" "<< *i;
         }

         return output;
      }


    friend istream &operator>>(istream &input, Point<T,U> &p ) {

        int index;
        T z;
        U att;

         input >> index >> p.x >> p.y >> z;
         input >> att;

        while(input){
            p.attr.push_back(att);
            input >> att;
        }

         return input;
      }

//Getters
     T getX(){return x;}
     T getY(){return y;}


private:
    T x;
    T y;
    vector<U> attr;

};

template<typename T, typename U>
Point<T,U>::Point(){}

template<typename T, typename U>
Point<T,U>::Point(T _x,T _y){
    x = _x;
    y = _y;
}

template<typename T, typename U>
Point<T,U>::Point(string _data){

    T index,z;
    U att;
    stringstream iss(_data);

    iss >> index >> x >> y >> z;

    iss >> att;

    while(iss){
        attr.push_back(att);
        iss >> att;
    }
}


template<typename T, typename U>
Point<T,U>::Point(const Point<T,U> &p){

    x = p.x;
    y = p.y;
    attr = p.attr;
}

template<typename T, typename U>
Point<T,U> Point<T,U>::operator=(const Point<T,U> &p){
    x = p.x;
    y = p.y;
    attr = p.attr;
    return *this;
}

template<typename T, typename U>
Point<T,U>::~Point(){}

