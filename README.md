
# APIs for certain topics

We are providing API for accessing our data for the following topics:

                    *[Fathers in Agriculture]()*
                    *[Institutes in India]()*
                    *[International Institutes]()*
                    
###Fathers in Agriculture
For Fathers in Agriculture use the following method to fetch the data from the link provided, as of now we are providing only for Android:
  >Just copy and paste, if you find alternate method don't hesitate to tell us!
  >We have used Async task for fetching the data

          ```
                new BackTask().execute ("https://api.npoint.io/30d25911e5587d4cbb81");

              }

              private class BackTask extends AsyncTask<String, Integer, String> {

              @Override

              protected void onPreExecute() {}

              protected String doInBackground(String... address) {

              String output = "";

              try {

              java.net.URL url = new java.net.URL(address[0]);

              java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(url.openStream()));

              String line;

              while ((line = in.readLine()) != null) {

              output += line;

              }

              in.close(); } catch (java.net.MalformedURLException e) {

              output = e.getMessage();

              } catch (java.io.IOException e) {

              output = e.getMessage();

              } catch (Exception e) {

              output = e.toString();

              }

              return output;

              }


              protected void onProgressUpdate(Integer... values) {}


              protected void onPostExecute(String s){

              ist = s;



              maplist = new Gson().fromJson(ist, new TypeToken<ArrayList<HashMap<String, Object>>>(){}.getType());
              listview1.setAdapter(new Listview1Adapter(maplist));
              ((BaseAdapter)listview1.getAdapter()).notifyDataSetChanged();
              }

          ```
