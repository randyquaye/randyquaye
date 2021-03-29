#include <iostream>
#include <sstream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include "triangle.h"



using namespace std;

template<typename T, typename U,typename V>  class Triangulation
{
private:
    map<int,Point<T,U> *>  points;
    map<int,Triangle<T,U,V> *>  triangles;

public:
    Triangulation();
    Triangulation(ifstream &input);
    Triangulation(const Triangulation<T,U,V> & tri);
    ~Triangulation();

    Triangle<T,U,V> findTriangleWithPoint(Point<T,U> p);
    double findIntegral();
    bool isDelaunay();

    friend ostream &operator<<(ostream &output, const Triangulation<T,U,V> &tri)
    {
        typename map<int,Point<T,U> *>::const_iterator it;
        typename map<int,Triangle<T,U,V> *>::const_iterator it2;
        for (it = tri.points.begin(); it!= tri.points.end(); it++)
            output << it->first<< " " <<*it->second<<endl;

        for (it2 = tri.triangles.begin(); it2!= tri.triangles.end(); it2++)
            output << it2->first<< " " <<*it2->second<<endl;

        return output;
    }

};



template<typename T, typename U, typename V>
Triangulation<T,U,V>::Triangulation() {}

template<typename T, typename U, typename V>
Triangulation<T,U,V>::Triangulation(ifstream &input)
{

    string current_line;
    int id_temp;

    int numOfPoints,numOfCordinates,numOfAttr;
    input>>numOfPoints>>numOfCordinates>>numOfAttr;
    input.ignore();

    //Populate the map of pointers to points
    for(int i = 0; i<numOfPoints; i++)
    {

        getline(input,current_line);
        stringstream geek(current_line.substr(0, current_line.find(' ')));
        geek>>id_temp;
        points[id_temp] = new Point<T,U>(current_line);
    }

    int numOfTri,verticePerTri,attrPerTri;
    input>>numOfTri>>verticePerTri>>attrPerTri;
    input.ignore();

    //Populate the map of pointers to triangles
    for(int i = 0; i<numOfTri; i++)
    {
        getline(input,current_line);
        stringstream geek(current_line.substr(0, current_line.find(' ')));
        geek>>id_temp;
        triangles[id_temp] = new Triangle<T,U,V> (current_line, &points);;
    }

}

template<typename T, typename U, typename V>
Triangulation<T,U,V>::Triangulation(const Triangulation<T,U,V> &p) {}

template<typename T, typename U, typename V>
Triangulation<T,U,V>::~Triangulation() {}

template<typename T, typename U, typename V>
Triangle<T,U,V> Triangulation<T,U,V>::findTriangleWithPoint(Point<T,U> p)
{

    typename map<int,Triangle<T,U,V> *>::const_iterator it = triangles.begin();;
    typename map<int,Triangle<T,U,V> *>::const_iterator it2 = triangles.end();

    bool foundPoint = false;
    while (it != it2 && foundPoint==false)
    {

        foundPoint = it->second->hasPoint(p);
        it++;
    }
    it--;

    if(foundPoint)
    {

        Triangle <T,U,V> t(*it->second);
        return t;
    }

    else
    {
        Triangle <T,U,V> t(*it->second);
        return t;
    }

}

template<typename T, typename U, typename V>
double Triangulation<T,U,V>::findIntegral()
{

    typename map<int,Triangle<T,U,V> *>::const_iterator it = triangles.begin();
    double result = 0;

    for (it = triangles.begin(); it!= triangles.end(); it++)
    {
        Function<T> f;
        result+= it->second->getApproximation(f);
    }
    return result;

}

template<typename T, typename U, typename V>
bool Triangulation<T,U,V>::isDelaunay()
{

    typename map<int,Triangle<T,U,V> *>::const_iterator it = triangles.begin();
    bool result = 0;

    for (it = triangles.begin(); it!= triangles.end(); it++)
    {
        Function<T> f;
        result+= it->second->getApproximation(f);
    }
    return result;

}


