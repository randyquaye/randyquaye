#include <iostream>
#include <sstream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include "triangulation.h"

/******RETURN EMPTY TRIANGLE IF NONE IS FOUND***************/

using namespace std;

int main()
{
    ifstream input;
    input.open("triangulation#1.tri");
    Triangulation<float,float,float> tri(input);
    input.close();

    cout<<tri;
    cout<<"Enter 'x' coordinate then 'y' coordinate of the point to search"<<endl;
    float x,y;
    cin>>x>>y;
    Point<float,float> p(x,y);
    cout<<tri.findTriangleWithPoint(p)<<endl;

    cout<<tri.findIntegral()<<endl;



    return 0;
}
