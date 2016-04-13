package com.company.rorywalsh.folkthis;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class TuneListScreen extends Activity implements AdapterView.OnItemClickListener {
    ListView listView;
    ArrayAdapter<String> listAdapter;
    ArrayList<String> links;
    ArrayList<String> linksByDate;
    ArrayList<String> names;
    String fileLocation;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        ActionBar actionBar = getActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);



        super.onCreate(savedInstanceState);
        //this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_tune_list_screen);
        Bundle extras = getIntent().getExtras();
        listView = (ListView) findViewById( R.id.tuneListView);
        fileLocation = extras.getString("location");
        listView.setOnItemClickListener(this);
        //int CHOICE_MODE_MULTIPLE=2;
        //listView.setChoiceMode(CHOICE_MODE_MULTIPLE);
        registerForContextMenu(listView);
        names = extras.getStringArrayList("tuneNames");
        links = extras.getStringArrayList("tuneLinks");

        Collections.reverse(names);
        Collections.reverse(links);
        linksByDate = new ArrayList<String>();
        linksByDate.addAll(links);

        if(!fileLocation.equals("remote")) {



            SharedPreferences settings = getSharedPreferences("SeamusPrefs", 0);
            String sortType = settings.getString("sort_by", "date");
            if (sortType.contains("name")) {
                Log.d("======================", sortType);
                Collections.sort(names);
                Collections.sort(links);
                Log.d("====", "Size of list of links=" + names.size());
            } else if (sortType.contains("type")) {
                sortByType();
            }

            //Log.d("=======================================", "onCreate TuneListScreen");
        }



        addTunesToListView(names);
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

        //Log.d("=========", links.get(info.position));
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
        Collections.reverse(tuneList);

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
        getMenuInflater().inflate(R.menu.tune_list_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        SharedPreferences settings = getSharedPreferences("SeamusPrefs", 0);
        SharedPreferences.Editor editor = settings.edit();

        int id = item.getItemId();

        if (id == R.id.action_settings) {
            return true;
        }
        else if(id == R.id.sort_by)
        {

        }
        else if(id == R.id.name)
        {
            editor.putString("sort_by", "name");
            editor.apply();
            Collections.sort(names);
            Collections.sort(links);
            addTunesToListView(names);
        }
        else if(id == R.id.date)
        {
            links.clear();
            links.addAll(linksByDate);
            updateNamesFromLinks();
            addTunesToListView(names);
            editor.putString("sort_by", "date");
            editor.apply();
        }
        else if(id == R.id.type)
        {
            sortByType();
            editor.putString("sort_by", "type");
            editor.apply();
        }
        else
            finish();
        return super.onOptionsItemSelected(item);
    }

    void sortByType()
    {
        Log.d("====", "Size of list of links=" + names.size());
        ArrayList<String> jigs, reels, hornpipes, slipjigs, slides, waltzes, dances, other;
        jigs = new ArrayList<String>();
        reels = new ArrayList<String>();
        hornpipes = new ArrayList<String>();
        slipjigs = new ArrayList<String>();
        slides = new ArrayList<String>();
        waltzes = new ArrayList<String>();
        dances = new ArrayList<String>();
        other = new ArrayList<String>();

        for(int i=0;i<links.size();i++)
        {
            Log.d("====", "Link=" + links.get(i));
            if (links.get(i).contains("Slip jig"))
                slipjigs.add(links.get(i));
            else if (links.get(i).contains("Jig"))
                jigs.add(links.get(i));
            else if (links.get(i).contains("Reel"))
                reels.add(links.get(i));
            else if (links.get(i).contains("Hornpipe"))
                hornpipes.add(links.get(i));
            else if (links.get(i).contains("Slide"))
                slides.add(links.get(i));
            else if (links.get(i).contains("Waltz"))
                waltzes.add(links.get(i));
            else if (links.get(i).contains("Dance"))
                dances.add(links.get(i));
            else
                other.add(links.get(i));
        }

        Collections.sort(jigs);
        Collections.sort(slipjigs);
        Collections.sort(slides);
        Collections.sort(hornpipes);
        Collections.sort(reels);
        Collections.sort(waltzes);
        Collections.sort(dances);
        Collections.sort(other);

        links.clear();
        links.addAll(jigs);
        links.addAll(slipjigs);
        links.addAll(slides);
        links.addAll(hornpipes);
        links.addAll(reels);
        links.addAll(waltzes);
        links.addAll(dances);
        links.addAll(other);

        updateNamesFromLinks();
        addTunesToListView(names);
        Log.d("====", "Size of list of links=" + names.size());
    }

    void updateNamesFromLinks()
    {
        names.clear();

        for(int i=0;i<links.size();i++)
        {
            names.add(links.get(i).substring(links.get(i).lastIndexOf("/") + 1).replace(".txt", ""));
        }
    }
}

