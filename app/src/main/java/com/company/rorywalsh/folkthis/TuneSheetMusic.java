package com.company.rorywalsh.folkthis;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import csnd6.CsoundPerformanceThread;
import csnd6.AndroidCsound;

class abcNote {
    ArrayList<Integer> jumpToBar = new ArrayList<Integer>();
    char noteName;
    float noteDur;
    int octave;
    String keySignature;

    float defaultNoteLength;
    int accidental;
    String timeSig;
    boolean startRepeat;
    float amplitude;
    public abcNote(char charAt, int oct) {
        jumpToBar.add(0);
        octave = oct;
        noteName = charAt;
        noteDur = 1;
        keySignature = "";
        defaultNoteLength = 1/8;
        accidental = 0;
    }
}

public class TuneSheetMusic extends Activity {
    WebView webView;
    String position;
    String htmlCode;
    String noteData;
    String tuneType;
    String csoundOrc;
    StringBuilder csoundSco;
    private ArrayList<abcNote> myABCNotes;
    private AndroidCsound csound;
    private ArrayList<String> notes;
    float tempo;
    private CsoundPerformanceThread perfThread;


    @Override
    public void onDestroy()
    {
        super.onDestroy();
        if(perfThread!=null)
        perfThread.Stop();
    }


    public StringBuilder generateCsoundScore(ArrayList<abcNote> myABCNotes, float time){
        //generate Csound score from ABC notes and data
        //Log.d("FFFFFFFFFFFFF", String.valueOf(myABCNotes.size()));
        float dur=0.f;
        //set up ten loops of performance..
        float emphasis=1;
        //String score;
        //emphasise every third beat
        if(myABCNotes.get(0).timeSig.equals("6/8")){
            emphasis = myABCNotes.get(0).defaultNoteLength*3.f*time;
            System.out.println("emphasis "+emphasis);
        }

        //emphasise every third beat
        if(myABCNotes.get(0).timeSig.equals("4/4")){
            emphasis = myABCNotes.get(0).defaultNoteLength*4.f*time;
            System.out.println("emphasis "+emphasis);
        }

        //emphasise every third beat
        if(myABCNotes.get(0).timeSig.equals("3/4")){
            emphasis = myABCNotes.get(0).defaultNoteLength*2.f*time;
            System.out.println("emphasis "+emphasis);
        }

        StringBuilder score= new StringBuilder(1024);
        score.append("r10\n");
        float clock=0f;
        float decay=1;
        for(int i=1;i<myABCNotes.size();i++){
            if(myABCNotes.get(i).amplitude==1)
                clock=0f;
            //System.out.println("i1\t\t"+String.valueOf(dur)+"\t\t"+String.valueOf(myNotes.get(i).noteDur*time)+"\t\t"+getMidiNote(myNotes.get(i)));
            String scoState="i1 "+String.valueOf(dur)+"\t\t\t\t"+String.valueOf(myABCNotes.get(i).noteDur*time)+"\t"+getMidiNote(myABCNotes.get(i))+" "+String.valueOf(decay)+" "+(clock%emphasis==0 ? 1 : .3f)+"\n";
            score.append(scoState);
            dur += myABCNotes.get(i).noteDur*time;
            clock +=myABCNotes.get(i).noteDur*time;
            int stop = (time==1.5f ? 7 : (time==2f ? 5 : 12));
            if(i>myABCNotes.size()-stop)
                decay = 0.05f;
        }

        score.append("\ns");
        return score;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setVisible(false);
        String tuneTitle="";
        tuneType = "";
        position = "sheetMusic";
        tempo = 2f;
        System.loadLibrary ("sndfile");
        System.loadLibrary ("csoundandroid");



        //========== CSOUND AND ABC PARSING STUFF=====================
        ArrayList<abcNote> myABCNotes = new ArrayList<abcNote>();
        csoundOrc="sr = 44100\n" +
        "ksmps = 64\n" +
        "nchnls=2\n" +
        "0dbfs=1\n" +
        "\n" +
        "\n" +
        "instr\t1\t; string pluck\n" +
        "kdamp\trandom 0.1, 0.2;chnget\t\"damp\"\t; damping\n" +
        "iplk\trandom\t0.5, 0.8 ;\t\"pos\"\t; pluck position\n" +
        "iamp\trandom\t0.5, 0.7\n" +
        "\n" +
        "iFreq cpsmidinn p4; = pow(2, ((p4-69)/12))*440;\n" +
        "\n" +
        "kmvt\tjspline\t\t0.15,0.2,1\t\t\n" +
        "asig\twgpluck2\tiplk, iamp, iFreq,   0.2+kmvt,          kdamp\n" +
        "\n" +
        "aenv\t\tlinsegr\t0, 0.0008, p6, 1, 0, p5, 0\t; amplitude envelope. Attack removes excessive 'click'. Decays to nothing across note duration (p3). Short release stage prevents click if a note is interrupted.\n" +
        "\n" +
        "asig\t=\tasig*aenv\n" +
        "\touts\tasig, asig\n" +
        "endin";

        setContentView(R.layout.activity_tune_sheet_music);
        Bundle extras = getIntent().getExtras();
        noteData = extras.getString("notes");

        webView= (WebView) findViewById(R.id.webView);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setVerticalScrollBarEnabled(false);
        webView.getSettings().setBuiltInZoomControls(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.setInitialScale(1);
        //webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

        final ProgressDialog pd = ProgressDialog.show(TuneSheetMusic.this, "", "Please wait a few moments while your music is being drawn...", true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon){
                pd.show();
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (pd.isShowing()) {
                    pd.dismiss();
                    //setRequestedOrientation (ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                    TuneSheetMusic.this.setVisible(true);
                }
            }
        });

        notes = new ArrayList<String>(Arrays.asList(noteData.split("[\r\n]")));
        try {
            myABCNotes = parseABCFile(notes);
            //Log.d("=========KEY:::", myABCNotes.get(0).keySignature);
        }
        catch (IOException e) {
            //Log.d("==========", "parse Notes exception");
        }

        //set key sig for each note....
        for(int i=1;i<myABCNotes.size();i++){
            myABCNotes.get(i).keySignature = myABCNotes.get(0).keySignature;
            myABCNotes.get(i).defaultNoteLength = myABCNotes.get(0).defaultNoteLength;
        }



        csoundSco = generateCsoundScore(myABCNotes, 1.5f);
        //Log.d("============FULL SCORE========", csoundSco.toString());




        for(int i=0;i<notes.size();i++){
            if(notes.get(i).contains("T:")) {
                tuneTitle = notes.get(i).substring(notes.get(i).indexOf("T:") + 2).trim();
//                notes.set(i, "T:     ");
            }
      if(notes.get(i).contains("R:")){
                String tune = notes.get(i).substring(notes.get(i).indexOf("R:") + 2).trim();
                tuneType = tune.substring(0,1).toUpperCase() + tune.substring(1);
                //notes.set(i, "R:     ");
            }
        }

        //remove any bogus lines
        for(int i=notes.size()-1;i>=0;i--)
            if(notes.get(i).startsWith("\n")){
                notes.remove(notes.get(i));
            }

        //TextView  title = (TextView) findViewById( R.id.tuneTitle);
        //title.setText(tuneTitle+" ("+tuneType+")");

        //Log.d("-_-_-_-_-", formatString(notes));
        htmlCode = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<style>\n" +
                "div {\n" +
                "    border: 2px solid #a1a1a1;\n" +
                "    padding: 10px 40px; \n" +
                "    background: #eeeeee;\n" +
                "    width: 300px;\n" +
                "    border-radius: 25px;\n" +
                "transform: translate3d(0,0,0);\n" +
                "-webkit-transform: translate3d(0,0,0);" +
                "}\n" +
                "body {\n" +
                "    background-color: #d4d4ca;\n" +
                "}\n" +
                "\n" +
                "h1 {\n" +
                "    background-color: #d4d4ca;\n" +
                "}\n" +
                "\n" +
                "p {\n" +
                "    background-color: #d4d4ca;\n" +
                "}\n" +
                "</style>\n" +
                "\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n" +
                "\t<title>"+tuneTitle+"</title>\n" +
                "\n" +
                "\t<script src=\"abcjs_editor_1.12-cl-min.js\" type=\"text/javascript\"></script>\n" +
                "</head>\n" +
                "<body>\n" +
                "<a id=\"sheetMusic\"><br>\n" +
                "<div align=\"center\" id=\"paper0\"></div>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<a id=\"abcMusic\"><br>\n" +
                "<textarea style=\"font-size: 18pt\" align=\"center\" name=\"abc\" id=\"abc\" cols=\"80\" rows=\"15\">" +
                formatString(notes) +"\n"+
                "</textarea>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n" +
                "</body>\n" +
                "<script type=\"text/javascript\">\n" +
                "\twindow.onload = function() {\n" +
                "\t\tabc_editor = new ABCJS.Editor(\"abc\", { scale: 0.4, paper_id: \"paper0\", warnings_id:\"warnings\" });\n" +
                "\t}\n" +
                "function scrollToElement(id) {\n" +
                "    var elem = document.getElementById(id);\n" +
                "    var x = 0;\n" +
                "    var y = 0;\n" +
                "\n" +
                "    while (elem != null) {\n" +
                "        x += elem.offsetLeft;\n" +
                "        y += elem.offsetTop;\n" +
                "        elem = elem.offsetParent;\n" +
                "    }\n" +
                "    window.scrollTo(x, y);\n" +
                "}" +
                "</script>\n" +
                "</html>";


        if (extras != null) {
            webView.loadDataWithBaseURL("file:///android_asset/", htmlCode, "text/html", "utf-8", "");
        }
    }

    public static String formatString(ArrayList<String> str) {
        StringBuilder builder = new StringBuilder();
        for (String value : str) {
            if(!value.trim().isEmpty())
            builder.append(value+"\n");
            //if(!value.trim().startsWith("\\n"))
            //builder.append(value);
        }
        return builder.toString();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.tune_sheet_music, menu);
        //return true;
        int TEMPO=0;
        SubMenu tempoMenu = menu.addSubMenu("Tempo");
        tempoMenu.add(TEMPO, 90, 0, "Fast");
        tempoMenu.add(TEMPO, 91, 1, "Medium");
        tempoMenu.add(TEMPO, 92, 2, "Slow");
        tempoMenu.add(TEMPO, 93, 2, "Baby Steps");

        int PLAYBACK=0;
        return super.onCreateOptionsMenu(menu);
    }

        public void csoundPerformance(String str){
            if(str.equals("start")) {
                // Create an instance of the Csound object
                csound = new AndroidCsound();
                // Using SetOption() to configure Csound
                // Note: use only one commandline flag at a time
                csound.SetOption("-odac");
                ((AndroidCsound) csound).setOpenSlCallbacks();
                csound.CompileOrc(csoundOrc);
                csound.ReadScore(csoundSco.toString());
                // When compiling from strings, this call is necessary before doing
                // any performing
                csound.Start();
                perfThread = new CsoundPerformanceThread(csound);
                perfThread.Play();
            }
            else{
                csound.RewindScore();
                perfThread.Stop();
                perfThread.Join();
                perfThread.delete();
                csound.delete();
            }
        }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        //Log.d("====Menu ID:", String.valueOf(id));
        if(id == R.id.toggle_view){
        if(position.equals("sheetMusic")) {
            webView.loadUrl("javascript:scrollToElement('" + "abcMusic" + "')");
            position = "abcMusic";
            }
        else{
            position = "sheetMusic";
            webView.loadUrl("javascript:scrollToElement('" + "sheetMusic" + "')");
            }
        }
        //fast
        else if(id==90){
            try {
                myABCNotes = parseABCFile(notes);
                //Log.d("=========KEY:::", myABCNotes.get(0).keySignature);
            }
            catch (IOException e) {
                //Log.d("==========", "parse Notes exception");
            }
            csoundSco = generateCsoundScore(myABCNotes, 1);
        }
        //medium
        else if(id==91){
            try {
                myABCNotes = parseABCFile(notes);
                //Log.d("=========KEY:::", myABCNotes.get(0).keySignature);
            }
            catch (IOException e) {
                //Log.d("==========", "parse Notes exception");
            }
            csoundSco = generateCsoundScore(myABCNotes, 1.5f);
        }
        //slow
        else if(id==92){
            try {
                myABCNotes = parseABCFile(notes);
                //Log.d("=========KEY:::", myABCNotes.get(0).keySignature);
            }
            catch (IOException e) {
               // Log.d("==========", "parse Notes exception");
            }
            csoundSco = generateCsoundScore(myABCNotes, 2f);
        }
        //very slow
        else if(id==93){
            try {
                myABCNotes = parseABCFile(notes);
                //Log.d("=========KEY:::", myABCNotes.get(0).keySignature);
            }
            catch (IOException e) {
                //Log.d("==========", "parse Notes exception");
            }
            csoundSco = generateCsoundScore(myABCNotes, 3f);
        }
        else if (id == R.id.play_tune)
        {
            if(item.getTitle().equals("Play Tune")){
                item.setTitle("Stop Tune");
                csoundPerformance("start");
            }
            else{
                item.setTitle("Play Tune");
                csoundPerformance("stop");
            }
            // This call runs Csound to completion

        }
        else if(id == R.id.share){
            Intent sharingIntent = new Intent(android.content.Intent.ACTION_SEND);
            sharingIntent.setType("text/plain");
            String shareBody = noteData+"\n\n"+csoundOrc+"\n\n"+csoundSco;
            sharingIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, "Subject Here");
            sharingIntent.putExtra(android.content.Intent.EXTRA_TEXT, shareBody);
            startActivity(Intent.createChooser(sharingIntent, "Share via"));
        }

        else if (id == R.id.save_tune) {
            File sdcard = Environment.getExternalStorageDirectory();
            File dir = new File(sdcard.getAbsolutePath() + "/seamus_app/");
            dir.mkdir();
            Document doc = Jsoup.parse(htmlCode);
            String fileName = doc.title();

            File file = new File(dir, fileName+" ("+tuneType+").txt");
            try {
                FileOutputStream os = new FileOutputStream(file);
                try{
                    os.write(noteData.getBytes());
                    os.close();
                }catch(IOException e){
                    e.printStackTrace();
                }

            } catch(FileNotFoundException fnfe) {
                System.out.println(fnfe.getMessage());
            }

            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private static int getMidiNote(abcNote note){
        int accidental = note.accidental;
        String key = note.keySignature;
        int octave = note.octave+12;
        int midiNote=0;
        switch (Character.toLowerCase(note.noteName)){
            case 'c':
                if(key.matches("d|e|a|edor|edorian|b|bmin|c#|f#|g#")){
                    midiNote = 61;
                }
                else
                    midiNote = 60;
                break;


            case 'd':
                if(key.matches("e|b|fmin|gmin|cmin")){
                    midiNote = 63;
                }
                else
                    midiNote = 62;

                break;

            case 'e':
                midiNote = 64;
                break;

            case 'f':
                if(key.matches("emin|d|e|g|a|b|edor|edorian|adorian|ador|eminor|bmin|amix|dmix")){
                    Log.d("==========", "F#");
                    midiNote = 66;
                }
                else
                    midiNote = 65;

                break;

            case 'g':
                if(key.matches("e|a|b|cmin|fmin")){
                    midiNote = 68;
                }
                else
                    midiNote = 67;

                break;

            case 'a':
                if (key.matches("b|cmin|fmin|gmin")){
                    midiNote = 70;
                }
                else
                    midiNote = 69;

                break;

            case 'b':
                if(key.matches("dmin|f")){
                    midiNote = 70;
                }
                else
                    midiNote = 71;


            default:
                break;

        }

        return midiNote+accidental+octave;
    }

    /*parse ABC file */
    private static ArrayList<abcNote> parseABCFile(ArrayList<String> notes) throws IOException
    {
        ArrayList<abcNote> myNotes = new ArrayList<abcNote>();
        //add dummy to hold key and timing info
        myNotes.add(new abcNote(' ', -1));
        String line = null;
        boolean foundNotes = false;
        float previousDur=0, defaultDur=0;
        ArrayList<String> abcText = new ArrayList<String>();
        ArrayList<String> bars = new ArrayList<String>();
        ArrayList<String> altEndings = new ArrayList<String>();
        ArrayList<Integer> repeats = new ArrayList<Integer>();
        //add first bar to repeats...
        repeats.add(-1);

        int lineNotesAppearOn=0;
        for(String note: notes) {
            abcText.add(note);
        }

        for(String note: abcText) {
            //Log.d("=======ABC TEXT=====", note);
        }
        //grab each of the section endings
        for(int i=0;i<abcText.size();i++)
        {
            if(foundNotes){
                String[] parts = abcText.get(i).split("\\|");
                //bars = new StringTokenizer(abcText.get(i), "|");
                for(String bar: parts){
                    if(!bar.matches("| +")){
                        bars.add("|"+bar+"|");
                        if(bars.get(bars.size()-1).contains("|1") || bars.get(bars.size()-1).contains("|2") || bars.get(bars.size()-1).contains("|3") || bars.get(bars.size()-1).contains("|4"))
                            altEndings.add("|"+bar+"|");
                        if(bars.get(bars.size()-1).contains(":|")){
                            repeats.add(bars.size()-1);
                            repeats.add(bars.size()-1);
                        }
                    }
                }
            }
            if(abcText.get(i).contains("K:")){
                foundNotes=true;
                lineNotesAppearOn=i+1;
            }
        }

        //remove last bar numbers with :|. they are not needed.
        if(repeats.size()>0)
            repeats.remove(repeats.size() - 1);
        if(repeats.size()>0)
            repeats.remove(repeats.size() - 1);

        boolean isRepeating=false;
        int jumpto=0;
        boolean newBar=false;

        ArrayList<String> abcExt = new ArrayList<String>();

        for(int i=0;i<bars.size();i++){

            if(bars.get(i).contains("|1") && isRepeating==true){
                bars.set(i, bars.get(i+1));
                System.out.println("i:"+i+":"+bars.get(i));
                abcExt.add(bars.get(i));
                i++;
                isRepeating=false;
            }
            else{
                System.out.println("i:"+i+":"+bars.get(i));
                abcExt.add(bars.get(i));
            }

            if(bars.get(i).contains("|1"))
                isRepeating=true;


            if(bars.get(i).contains(":|")){
                if(jumpto<repeats.size()){
                    i=repeats.get(jumpto);
                    System.out.println("jumping to:"+i);
                    jumpto++;
                }
            }

        }

        for(int test: repeats){
            System.out.println(test);
        }


        for(int i=abcText.size()-1;i>=lineNotesAppearOn;i--){
            abcText.remove(i);
        }



        for(String str: abcExt){
            abcText.add(str);
        }

        foundNotes=false;

        for(int p=0;p<abcText.size();p++){
            line = abcText.get(p);

            String dotted="";
            boolean triplet=false;
            int numberOfNotes=0;
            String accidentals="";
            ArrayList<Character> accidents = new ArrayList<Character>();


            //we've reached the notes...
            if(foundNotes){
                //System.out.println(line);
                while(line.indexOf("{")!=-1 && line.indexOf("}")!=-1){
                    //remove grace notes for the time being
                    String graceNotes = line.substring(line.indexOf("{"), line.indexOf("}")+1);
                    line = line.replace(graceNotes, "");
                }
                while(line.indexOf("[")!=-1 && line.indexOf("]")!=-1){
                    //remove grace notes for the time being
                        String extra = line.substring(line.indexOf("["), line.indexOf("]") + 1);
                        line = line.replace(extra, "");
                }
                while(line.indexOf("\"")!=-1){
                    //remove chords for the time being
                    int pos = line.indexOf("\"");
                    String chords = line.substring(pos, line.indexOf("\"", pos+1)+1);
                    line = line.replace(chords, "");
                }
                if(line.startsWith("M:"))
                    line="";
                if(line.startsWith("K:"))
                    line="";
                //System.out.println(line);



                for(int i=0;i<line.length();i++){
                    if(!Character.isWhitespace(line.charAt(i))){
                        //add note name to abcNotes array
                        if(Character.isLetter(line.charAt(i))){
                            if(Character.isUpperCase(line.charAt(i))){
                                //upper case note
                                myNotes.add(new abcNote(line.charAt(i), -12));
                            }
                            else {
                                //lower case note
                                myNotes.add(new abcNote(line.charAt(i), 0));
                            }

                            if(dotted=="long"){
                                myNotes.get(myNotes.size()-1).noteDur=previousDur/3.f;
                                previousDur = previousDur/3.f;
                                dotted = "";
                            }
                            else if(dotted=="short"){
                                myNotes.get(myNotes.size()-1).noteDur=previousDur*3.f;
                                previousDur = previousDur*3.f;
                                dotted = "";
                            }
                            else{
                                if(numberOfNotes>0){
                                    myNotes.get(myNotes.size()-1).noteDur = (defaultDur*2.f)/3.f;
                                    numberOfNotes--;
                                    //System.out.println("numberOfNotes:"+String.valueOf(numberOfNotes));

                                }
                                else{
                                    myNotes.get(myNotes.size()-1).noteDur=defaultDur;
                                }
                                previousDur = defaultDur;
                            }
                            if(accidentals.length()>0){
                                for(int y=0;y<accidents.size();y++){
                                    if(myNotes.get(myNotes.size()-1).noteName==accidents.get(y)){
                                        if(accidentals.equals("sharp"))
                                            myNotes.get(myNotes.size()-1).accidental=1;
                                        else if(accidentals.equals("flat"))
                                            myNotes.get(myNotes.size()-1).accidental=-1;
                                        else if(accidentals.equals("natural")) {
                                            myNotes.get(myNotes.size() - 1).accidental = -1;
                                        }
                                    }
                                }
                            }
                            if(newBar) {
                                myNotes.get(myNotes.size() - 1).amplitude = 1f;
                                newBar = false;
                            }
                        }

                        //sort out note duration
                        else if(Character.isDigit(line.charAt(i))){
                            if(line.length()>=i-1)
                                if(line.charAt(i-1)!='|'){
                                    if(!triplet){
                                        myNotes.get(myNotes.size()-1).noteDur=defaultDur*Character.getNumericValue(line.charAt(i));
                                        previousDur = defaultDur*Character.getNumericValue(line.charAt(i));
                                    }
                                    else{
                                        numberOfNotes=Character.getNumericValue(line.charAt(i));
                                        triplet=false;
                                    }
                                }
                                else{

                                }

                        }
                        //System.out.println(line.charAt(i));

                        //sort out note duration
                        else if(line.charAt(i)=='/'){
                            if(previousDur!=defaultDur)
                                myNotes.get(myNotes.size()-1).noteDur= previousDur/2.f;
                            else
                                myNotes.get(myNotes.size()-1).noteDur=defaultDur/2.f;
                            //System.out.println(line.charAt(i));
                        }

                        //triplet. tuplets, etc..
                        else if(line.charAt(i)=='('){
                            triplet=true;
                        }

                        //triplet. tuplets, etc..
                        else if(line.charAt(i)==':'){
                            if(line.length()>=i+1)
                                if(Character.toLowerCase(line.charAt(i+1))=='|'){
                                    myNotes.get(myNotes.size()-1).startRepeat=true;
                                    myNotes.get(0).jumpToBar.add(myNotes.size()-1);
                                    System.out.println("start repeat:"+String.valueOf(myNotes.size()-1)+"\n"+myNotes.get(0).jumpToBar.get(0));
                                }

                            if(line.length()>=i-1)
                                if(Character.toLowerCase(line.charAt(i-1))=='|'){
                                    myNotes.get(0).jumpToBar.add(myNotes.size()-1);
                                }
                        }

                        //triplet. tuplets, etc..
                        else if(line.charAt(i)=='^'){
                            if(line.length()>=i+1){
                                System.out.println("sharp");
                                accidents.add(Character.toLowerCase(line.charAt(i+1)));
                                accidentals="sharp";
                            }
                        }

                        //accidentals
                        else if(line.charAt(i)=='_'){
                            if(line.length()>=i+1){
                                accidents.add(Character.toLowerCase(line.charAt(i+1)));
                                accidentals="flat";
                            }
                        }
                        //accidentals
                        else if(line.charAt(i)=='='){
                            accidents.add(Character.toLowerCase(line.charAt(i+1)));
                            accidentals="natural";
                        }
                        //accidentals
                        else if(line.charAt(i)=='|'){
                            accidentals="";
                            newBar=true;
                        }
                        //triplet. tuplets, etc..
                        else if(line.charAt(i)=='-'){
                            myNotes.get(myNotes.size()-1).noteDur= myNotes.get(myNotes.size()-1).noteDur*2;
                        }
                        //set octave for notes followed by a ,
                        else if(line.charAt(i)==','){
                            char note = myNotes.get(myNotes.size()-1).noteName;
                            if(Character.isUpperCase(note)){
                                myNotes.get(myNotes.size()-1).octave = -24;
                            }
                            else{
                                System.out.println("error: found a , after a lower case note??");
                            }
                        }

                        // >
                        else if(line.charAt(i)=='>'){
                            myNotes.get(myNotes.size()-1).noteDur = previousDur+(previousDur/2.f);
                            previousDur = previousDur+(previousDur/2.f);
                            dotted = "long";
                        }

                        // <
                        else if(line.charAt(i)=='<'){
                            myNotes.get(myNotes.size()-1).noteDur = (previousDur/2.f);
                            previousDur = (previousDur/2.f);
                            dotted = "short";
                        }

                        //set octave for notes followed by a '
                        else if(line.charAt(i)=='\''){
                            char note = myNotes.get(myNotes.size()-1).noteName;
                            if(Character.isLowerCase(note)){
                                myNotes.get(myNotes.size()-1).octave = +12;
                            }
                            else{
                                System.out.println("error: found a ' after an upper case note??");
                            }
                        }

                    }
                }
            }
            //else if still reading header section.....
            else{
                //parse key signature
                if(line.startsWith("M:")){
                    myNotes.get(0).timeSig = line.substring(line.indexOf(":")+1).trim();
                    System.out.println("======"+line.substring(line.indexOf(":")+1).trim());
                }
                else if(line.startsWith("L:")){
                    String left = line.substring(line.indexOf(":")+1, line.indexOf("/")).trim();
                    String right = line.substring(line.indexOf("/")+1).trim();
                    myNotes.get(0).defaultNoteLength = Float.valueOf(left)/Float.valueOf(right);
                    defaultDur = Float.valueOf(left)/Float.valueOf(right);
                    previousDur = defaultDur;
                }
                else if(line.contains("K:")){
                    //System.out.println(line.substring(line.indexOf(":")+1).trim());
                    if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("a|amaj|amajor"))
                        myNotes.get(0).keySignature = "a";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("b|bmaj|bmajor"))
                        myNotes.get(0).keySignature = "b";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("c|cmaj|cmajor"))
                        myNotes.get(0).keySignature = "c";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("d|dmaj|dmajor"))
                        myNotes.get(0).keySignature = "d";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("e|emaj|emajor"))
                        myNotes.get(0).keySignature = "e";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("f|fmaj|fmajor"))
                        myNotes.get(0).keySignature = "f";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("g|gmaj|gmajor"))
                        myNotes.get(0).keySignature = "g";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("am|amin|aminor"))
                        myNotes.get(0).keySignature = "amin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("bm|bmin|bminor"))
                        myNotes.get(0).keySignature = "bmin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("cm|cmin|cminor"))
                        myNotes.get(0).keySignature = "cmin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("dm|dmin|dminor"))
                        myNotes.get(0).keySignature = "dmin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("em|emin|eminor"))
                        myNotes.get(0).keySignature = "emin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("fmin|fminor"))
                        myNotes.get(0).keySignature = "fmin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("gmin|gminor"))
                        myNotes.get(0).keySignature = "gmin";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("ador|adorian"))
                        myNotes.get(0).keySignature = "ador";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("bdor|bdorian"))
                        myNotes.get(0).keySignature = "bdor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("cdor|cdorian"))
                        myNotes.get(0).keySignature = "cdor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("ddor|ddorian"))
                        myNotes.get(0).keySignature = "ddor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("edor|edorian"))
                        myNotes.get(0).keySignature = "edor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("fdor|fdorian"))
                        myNotes.get(0).keySignature = "fdor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("gdor|gdorian"))
                        myNotes.get(0).keySignature = "gdor";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("amix|amixolydian"))
                        myNotes.get(0).keySignature = "amix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("bmix|bmixolydian"))
                        myNotes.get(0).keySignature = "bmix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("cmix|cmixolydian"))
                        myNotes.get(0).keySignature = "cmix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("dmix|dmixolydian"))
                        myNotes.get(0).keySignature = "dmix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("emix|emixolydian"))
                        myNotes.get(0).keySignature = "emix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("fmix|fmixolydian"))
                        myNotes.get(0).keySignature = "fmix";
                    else if(line.substring(line.indexOf(":")+1).trim().toLowerCase().matches("gmix|gmixolydian"))
                        myNotes.get(0).keySignature = "gmix";
                    else{
                        System.out.println("unsupported key\n"+line.substring(line.indexOf(":")+1).trim().toLowerCase());
                    }
                    foundNotes=true;
                }
            }
        }
        return myNotes;
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            // your code
            finish();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

}
