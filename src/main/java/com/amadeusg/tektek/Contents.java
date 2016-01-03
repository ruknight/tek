/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.amadeusg.tektek;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 *
 * @author daiki
 */
public class Contents {
    public static Objects getJson() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
       
        String path = ContentsResource.class.getResource("").getPath();
        File gson_file = new File(path + "../../../../contents.json");
        String json_text = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(gson_file));
            String line;
            while ((line = br.readLine()) != null) {
                json_text += line;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        Objects objects = gson.fromJson(json_text, Objects.class);
        return objects;
    }
    
}
