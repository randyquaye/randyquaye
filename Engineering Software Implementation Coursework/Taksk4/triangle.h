#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <math.h>
#include "point.h"
#include "function.h"

using namespace std;

template<typename Y,typename T,typename U>  class Triangle
{
private:
    map<int,Point<T,U> *> points;
    vector<Y> attr;

public:
    Triangle();
    Triangle(string data,map<int,Point<T,U> *> *all_points);
    Triangle(const Triangle<Y,T,U> &triangle);
    Triangle(map<int,Point<T,U> *>,vector<Y> _attr);
    ~Triangle();

    Triangle operator=(const Triangle<Y,T,U> &triangle);

    //File Stream
    friend ostream &operator<<( ostream &output, const Triangle<Y,T,U> &t )
    {

        typename map<int,Point<T,U> *>::const_iterator it;
        for (it = t.points.begin(); it!= t.points.end(); it++)
            output << it->first<< " ";

        if(!t.attr.empty())
        {

            for (typename  vector<U>::const_iterator i = t.attr.begin(); i != t.attr.end(); ++i)
                cout << *i <<" ";
        }

        return output;
    }

    //Member Functions
    float  analysis(Point<T,U> p, Point<T,U> va, Point<T,U> vb);
    bool hasPoint(Point<T,U> p);
    double getApproximation(Function<T> f);


    //Getters
    map<int,Point<T,U> *> getPoints()
    {
        return points;
    }
};

template<typename Y,typename T,typename U>
Triangle<Y,T,U>::Triangle() {}

template<typename Y,typename T,typename U>
Triangle<Y,T,U>::Triangle(string data, map<int,Point<T,U> *> * all_points)
{

    int index,t1,t2,t3;
    Y att;

    stringstream iss(data);

    iss >> index >> t1 >> t2 >> t3;

    iss >> att;

    while(iss)
    {
        attr.push_back(att);
        iss >> att;
    }

    points[t1] = (*all_points)[t1];
    points[t2] = (*all_points)[t2];
    points[t3] = (*all_points)[t3];

}

template<typename Y,typename T,typename U>
Triangle<Y,T,U>::Triangle(const Triangle<Y,T,U> &triangle)
{
    points = triangle.points;
    attr = triangle.attr;
}

template<typename Y,typename T,typename U>
Triangle<Y,T,U> Triangle<Y,T,U>::operator=(const Triangle<Y,T,U> &triangle)
{
    points = triangle.points;
    attr = triangle.attr;
}

template<typename Y, typename T, typename U>
Triangle<Y,T,U>::~Triangle() {}

template<typename Y, typename T, typename U>
float Triangle<Y,T,U>::analysis(Point<T,U> p, Point<T,U> va, Point<T,U> vb)
{
    return (p.getX() - vb.getX()) * (va.getY() - vb.getY()) - (va.getX() - vb.getX()) * (p.getY() - vb.getY());
}
template<typename Y, typename T, typename U>
bool Triangle<Y,T,U>::hasPoint(Point<T,U> p)
{
    //Get coordinates of 3 other points from triangle
    typename map<int,Point<T,U> *>::const_iterator it;
    vector<Point<T,U> > v;
    v.reserve(3);


    for (it = points.begin(); it!= points.end(); it++)
    {
        Point<T,U> pt(*it->second);
        v.push_back(pt);
    }


    bool b1, b2, b3;

    b1 = analysis(p, v[0], v[1]) < 0.0f;
    b2 = analysis(p, v[1], v[2]) < 0.0f;
    b3 = analysis(p, v[2], v[0]) < 0.0f;

    return (b1 == b2) && (b2 == b3);
}


template<typename Y, typename T, typename U>
double Triangle<Y,T,U>::getApproximation(Function<T> f)
{

    typename map<int,Point<T,U> *>::const_iterator it;

    vector<Point<T,U> *> v;
    v.reserve(3);


    for (it = points.begin(); it!= points.end(); it++)
    {
        v.push_back(it->second);
    }

    double average = (f(v[0]) + f(v[1])+ f(v[2]))/3;
    double area = 0.5 * fabs((v[0]->getX() - v[2]->getX())*(v[1]->getY()-v[0]->getY())  - (v[0]->getX()-v[1]->getX())*(v[2]->getY()-v[0]->getY()));

    return area * average;
}


