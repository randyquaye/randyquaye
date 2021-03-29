#include <iostream>
#include <sstream>
#include <string>
#include <vector>


template<typename T> class Expression
{
public:
    virtual double evaluate(Point<T,T> p){return 0;}
};

//
//template<typename Y>class Sum:Expression<Y>
//{
//
//private:
//    Expression<Y> a,b;
//
//
//public:
//    Sum(Expression<Y> _a, Expression<Y> _b)
//    {
//        a = _a;
//        b = _b;
//    }
//
//    virtual double evaluate(Point<Y,Y> p)
//    {
//        double ex = a.evaluate(p) + b.evaluate(p);
//        return ex;
//    }
//
//};


template<typename T> class Constant: Expression<T>
{
private:
    double value;

public:
    Constant(double v)
    {
        value = v;
    }


    virtual double evaluate(Point<T,T>)
    {
        return value;
    }

};

template<typename T> class XVariable: Expression<T>
{


public:
    XVariable(){}


    virtual double evaluate(Point<T,T> p )
    {
        return (double) p.getX();
    }

};


template<typename T> class YVariable: Expression<T>
{


public:
    YVariable(){}


    virtual double evaluate(Point<T,T> p )
    {
        return (double) p.getY();
    }

};


