package com.company.rorywalsh.folkthis;


import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.ArrayAdapter;

import java.io.File;
import java.util.ArrayList;
import org.jsoup.Jsoup;
import android.widget.AdapterView;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import android.os.AsyncTask;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

public class HomeScreen extends Activity implements OnItemClickListener, AdapterView.OnItemSelectedListener {
    Spinner spinner;
    //item list stuff
    ArrayAdapter<String> listAdapter;
    String fileLocation;
    String searchURL;
    ArrayList<String> tuneTypes;
    ArrayList<String> tuneLinks;
    ProgressDialog progress;
    String currentTuneType="";

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        searchURL="";
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.setTitle("Seamus");

        //Log.d("=======================================", "onCreate HomeScreen");
        setContentView(R.layout.activity_home_screen);

        ImageView image = (ImageView) findViewById(R.id.imageView);
        if (this.getResources().getConfiguration().orientation== Configuration.ORIENTATION_LANDSCAPE){
            //Log.d("=======", "landscape");
            image.setVisibility(View.GONE);
        }

        tuneTypes = new ArrayList<String>();
        tuneLinks = new ArrayList<String>();
        tuneLinks.clear();
        tuneTypes.add("Type of Tune");
        tuneTypes.add("jig");
        tuneTypes.add("reel");
        tuneTypes.add("slip jig");
        tuneTypes.add("hornpipe");
        tuneTypes.add("polka");
        tuneTypes.add("slide");
        tuneTypes.add("waltze");
        tuneTypes.add("barndance");
        tuneTypes.add("strathspey");
        tuneTypes.add("three-two");
        tuneTypes.add("mazurka");
        tuneTypes.add("Most popular");
        addStringsToSpinner(tuneTypes);


        EditText SearchEditText =(EditText)findViewById(R.id.searchText);
        SearchEditText.setOnEditorActionListener(new TextView.OnEditorActionListener(){

            @Override
            public boolean onEditorAction(TextView arg0, int arg1, KeyEvent arg2) {
                if(arg1 == EditorInfo.IME_ACTION_SEARCH)
                {
                    searchForTunes("remote");
                }
                return false;
            }

        });
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id)
    {

    }

    public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
        if(tuneTypes.get(pos).equals("Type of Tune"))
            searchURL = "http://thesession.org/tunes/search?type=&mode=&q=";
        else if(tuneTypes.get(pos).equals("Most popular"))
            searchURL = "http://thesession.org/tunes/popular?";
        else
            searchURL = "http://thesession.org/tunes/search?type="+tuneTypes.get(pos)+"&mode=&q=";

        currentTuneType = tuneTypes.get(pos);
    }

    @Override
    public void onNothingSelected(AdapterView<?> arg0) {
        // TODO Auto-generated method stub

    }

    public void searchForTunes(String location){
        fileLocation = location;
        tuneLinks.clear();
        if(location.equals("remote")) {
            MyHtmlParser parser = new MyHtmlParser();
            EditText textBox = (EditText) findViewById(R.id.searchText);
            String urlAddress = searchURL + textBox.getText();
            parser.execute("links", urlAddress);
        }
        else{
            File sdCard = Environment.getExternalStorageDirectory();
            // to this path add a new directory path
            File dir = new File(sdCard.getAbsolutePath() + "/seamus_app/");
            if(dir.exists()) {
                File[] fileList = dir.listFiles();
                ArrayList<String> fileNames = new ArrayList<String>();
                for (int i = 0; i < fileList.length; i++) {
                    fileNames.add(fileList[i].getName().replace(".txt", ""));
                    tuneLinks.add(fileList[i].getAbsolutePath());
                }
                if (tuneLinks.size() > 0)
                    addTunesToTuneListScreen(fileNames);
            }
            else{
                AlertDialog alertDialog = new AlertDialog.Builder(this).create();
                alertDialog.setTitle("Info");
                alertDialog.setMessage("Tune book is currently empty.");
                //alertDialog.setIcon(R.drawable.logoconcertina);
                alertDialog.show();
            }
        }
    }

    public void buttonOnClick(View view) {
        switch (view.getId()) {
            case R.id.searchButton: {
                searchForTunes("remote");
                break;
            }
            case R.id.savedTunesButton: {
                searchForTunes("local");
                break;
            }
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home_screen, menu);
        return true;
    }

    //add tune types to spinner
    void addStringsToSpinner(ArrayList<String> str){
        // Find the ListView resource.
        spinner = (Spinner) findViewById( R.id.tuneTypeSpinner);

        ArrayList<String> tuneList = new ArrayList<String>();
        // Create ArrayAdapter using the planet list.
        listAdapter = new ArrayAdapter<String>(this, R.layout.spinner_item, tuneList);

        //append tune titles to list view
        for(String tuneTitle : str)
        {
            listAdapter.add(tuneTitle);
        }
        spinner.setAdapter( listAdapter );
        spinner.setOnItemSelectedListener(this);
    }


    //add tunes to TuneListScreenActivty
    void addTunesToTuneListScreen(ArrayList<String> tuneNamesArray){
        //Log.d("=======================================", "addTunesToTuneListScreen HomeScreen");
        Intent i = new Intent(getApplicationContext(), TuneListScreen.class);
        i.putExtra("location", fileLocation);
        i.putStringArrayListExtra("tuneNames", tuneNamesArray);
        i.putStringArrayListExtra("tuneLinks", tuneLinks);
        startActivity(i);
    }

    private class MyHtmlParser extends AsyncTask<String, Void, String>
    {
        ArrayList<String> tuneNames;
        @Override
        protected String doInBackground(String... urls){
            String response = "";
            tuneLinks.clear();
            tuneNames = new ArrayList<String>();
            try {
                    int pageCount = 1;
                    String urlAddress = urls[1];
                    boolean continueSearch = true;
                    int page = 1;
                    for( int i=0;i<pageCount;i++) {
                        while(continueSearch) {
                            Document doc = Jsoup.connect(urlAddress + "&page="+page).get();
                            //Log.d("====", urlAddress + "&page="+page);
                            page++;

                            Elements links = doc.select("a");

                            for (Element link : links) {
                                if (link.attr("abs:href").contains("/tunes/") &&  !link.attr("abs:href").contains("/tunes/popular") && !link.attr("abs:href").contains("search")) {
                                    tuneLinks.add(link.attr("abs:href"));
                                    tuneNames.add(link.text().trim() + "\n");
                                }
                            }

                            if(currentTuneType.equals("Most popular")){
                             if(page>10) continueSearch = false;
                            }

                            Elements p= doc.getElementsByTag("p");
                            for (Element element : p){
                                if(element.text().equals("No results.")){
                                    continueSearch = false;
                                    //Log.d("---", "no more hits, page:"+page);
                                }

                            }
                        }
                    }



                }

            catch (Exception e){
                e.printStackTrace();
            }

            return response;
        }

        @Override
        protected void onPreExecute() {
            progress = new ProgressDialog(HomeScreen.this);
            progress.setMessage("Searching overs 150,000 tunes. The more specific you are, the quicker this search will be :)");
            progress.setCancelable(true);
            progress.show();
        }

        @Override
        protected void onPostExecute(String response) {
            progress.dismiss();
            addTunesToTuneListScreen(tuneNames);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.settings) {
            AlertDialog alertDialog = new AlertDialog.Builder(this).create();
            alertDialog.setTitle("About");
            alertDialog.setMessage("Seamus uses ABCJs(http://abcjs.net/) to render the music as standard notation and Csound(http://csound.github.io/) for the playback engine. Note that some tunes may not play back correctly due to poor formatting in the original ABC notation. ");
            //alertDialog.setIcon(R.drawable.logoconcertina);
            alertDialog.show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
