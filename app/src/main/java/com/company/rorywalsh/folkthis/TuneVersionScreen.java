package com.company.rorywalsh.folkthis;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;


public class TuneVersionScreen  extends Activity implements AdapterView.OnItemClickListener {

    //item list stuff
    ListView mainListView;
    ArrayAdapter<String> listAdapter;
    ArrayList<String> tuneNotes;
    ProgressDialog progress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_tune_version_screen);
        tuneNotes = new ArrayList<String>();
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String value = extras.getString("link");
            MyHtmlParser parser = new MyHtmlParser();
            //EditText textBox = (EditText) findViewById(R.id.searchText);
            String urlAddress = value;
            parser.execute(urlAddress);
            //System.out.print(value);
        }
        mainListView = (ListView) findViewById(R.id.listView);
        mainListView.setOnItemClickListener(this);
        //tuneLinks = new ArrayList<String>();
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent i = new Intent(getApplicationContext(), TuneSheetMusic.class);
        i.putExtra("location", "remote");
        i.putExtra("notes", tuneNotes.get(position));
        startActivity(i);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.tune_version_screen, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if(id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    void addVersionToListView(ArrayList<String> str) {
        // Find the ListView resource.
        mainListView = (ListView) findViewById(R.id.listView);
        ArrayList<String> tuneList = new ArrayList<String>();
        // Create ArrayAdapter using the planet list.
        listAdapter = new ArrayAdapter<String>(this, R.layout.listview_text_item, tuneList);
        int cnt = 1;
        //append tune titles to list view
        for (String tuneTitle : str) {
            listAdapter.add("Version " + String.valueOf(cnt));
            cnt++;
        }
        mainListView.setAdapter(listAdapter);
        mainListView.setBackgroundResource(R.drawable.rounded_button);

    }

    private class MyHtmlParser extends AsyncTask<String, Void, String> {
        ArrayList<String> tunes;

        @Override
        protected void onPreExecute() {
            progress = new ProgressDialog(TuneVersionScreen.this);
            progress.setMessage("Searching for versions");
            progress.setCancelable(true);
            progress.show();
        }

        @Override
        protected String doInBackground(String... urls) {
            String response = "";
            tunes = new ArrayList<String>();
            try {
                Document doc = Jsoup.connect(urls[0]).get();
                Elements inputElements = doc.getElementsByTag("input");
                for (Element abcNotes : inputElements) {
                    if (abcNotes.attr("name").contains("abc")) {
                        tuneNotes.add(abcNotes.attr("value").replace("<br>", "\\n"));

                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return response;
        }

        @Override
        protected void onPostExecute(String response) {
            progress.dismiss();
            addVersionToListView(tuneNotes);
        }
    }
}