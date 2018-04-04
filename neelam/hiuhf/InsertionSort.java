class InsertionSort
{
	public static void main(String args[])
	{
		int a[]={18,9,33,4,84,32};
		int i,key;
		for(int j=1;j<a.length;j++)
		{
			key=a[j];
			i=j-1;
			while(i>-1 && a[i]>key)
			{
				a[i+1]=a[i];
				i--;
			}
			a[i+1] = key; 
		
		}
		System.out.println("After insertion sort:");
		for(i=0;i<a.length;i++)
		{
			System.out.println(a[i]);
		}
	}
}