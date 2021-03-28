
#include <vector>
#include <iostream>

using namespace std;

long long maxPair(const vector<int> & numbers){
    long long result  = 0;
    int n = numbers.size();
    int max_index1= -1;
    int max_index2 = -1;

    for(int i=0;i<n;i++){
        if(numbers[i]>numbers[max_index1] || max_index1 == -1)
            max_index1 = i;
    }

    if (max_index1==0) max_index2 =1; 

    for(int j=0;j<n;j++){
        if(numbers[j]>numbers[max_index2] && j!= max_index1 || max_index2 == -1)
            max_index2 = j;
    }

    result = ((long long) numbers[max_index1]) * numbers[max_index2];
    return result;

}


int main(){

    //get length
    int n = 0;
    cin >> n;

    //populate vector
    vector<int> numbers(n);
    for(int i =0;i<n;i++){
        cin>>numbers[i];
    }

    cout << maxPair(numbers);

    return 0;
}