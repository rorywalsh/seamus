package com.company.rorywalsh.folkthis;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class TuneListScreen extends Activity implements AdapterView.OnItemClickListener {
    ListView listView;
    ArrayAdapter<String> listAdapter;
    ArrayList<String> links;
    ArrayList<String> names;
    String fileLocation;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_tune_list_screen);
        Bundle extras = getIntent().getExtras();
        listView = (ListView) findViewById( R.id.tuneListView);
        listView.setOnItemClickListener(this);
        registerForContextMenu(listView);
        names = extras.getStringArrayList("tuneNames");
        links = extras.getStringArrayList("tuneLinks");
        addTunesToListView(names);
        fileLocation = extras.getString("location");

        Log.d("=======================================", "onCreate TuneListScreen");


    }

    @Override
    public void onCreateContextMenu(ContextMenu menu,
                                    View v, ContextMenu.ContextMenuInfo menuInfo) {
        menu.add(0, 1, 0, "Remove from tune book");
        super.onCreateContextMenu(menu, v, menuInfo);
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        super.onContextItemSelected(item);
        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();

        Log.d("=========", links.get(info.position));
        if(item.getTitle().equals("Remove from tune book")) {
            File file = new File(links.get(info.position));
            file.delete();
            names.remove(info.position);
            links.remove(info.position);
            addTunesToListView(names);
        }
        return true;
    };

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        if(fileLocation.equals("remote")) {
            Intent i = new Intent(getApplicationContext(), TuneVersionScreen.class);
            String urlAddress = links.get(position);
            i.putExtra("link", urlAddress);
            startActivity(i);
        }
        else{
            Intent i = new Intent(getApplicationContext(), TuneSheetMusic.class);
            File file = new File(links.get(position));
            StringBuilder notes = new StringBuilder();

            try {
                BufferedReader br = new BufferedReader(new FileReader(file));
                String line;

                while ((line = br.readLine()) != null) {
                    notes.append(line);
                    notes.append('\n');
                }
            }
            catch (IOException e) {
                //You'll need to add proper error handling here
            }

            i.putExtra("notes", notes.toString());
            startActivity(i);
        }
    }

    //add tune types to list view
    void addTunesToListView(List<String> str){
        // Find the ListView resource.
        listView = (ListView) findViewById( R.id.tuneListView);
        ArrayList<String> tuneList = new ArrayList<String>();
        // Create ArrayAdapter using the planet list.
        listAdapter = new ArrayAdapter<String>(this, R.layout.listview_text_item, tuneList);
        int numberOfTunes=0;
        //append tune titles to list view
        for(String tuneTitle : str)
        {
            listAdapter.add(tuneTitle);
            numberOfTunes++;
        }
        if(numberOfTunes==0)
            listAdapter.add("No results found, please try again.");

        listView.setAdapter( listAdapter );
        listView.setBackgroundResource(R.drawable.rounded_button);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.tune_list_screen, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
