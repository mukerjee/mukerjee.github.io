dojo.require("dojo.window");
dojo.require("dojo.NodeList-traverse");


/********************** MUSIC VIDEOS **********************/

// Add new videos to the top of the list, be careful of any apostrophes in the title
// Be sure to use the embed link from youtube

var vid = [
           ['Into the Thick of It - Secret of Mana', 'http://www.youtube.com/embed/JjnB5NuH63M'],
           ['Liberi Fatali 2016 - Final Fantasy VIII', 'http://www.youtube.com/embed/YGjl92DqhnA'],
           // ['Lamprey - Rogue Legacy', 'http://www.youtube.com/embed/bam14RrmfPU'],    
           ['Vampire Killer - Castlevania','http://www.youtube.com/embed/ol0HMKyrSzI'],
           ['The Epic Final Fantasy VIII Medley [Part 1]','http://www.youtube.com/embed/jFW_zaXFzcs'],
           ['J-E-N-O-V-A & Birth of a God - Final Fantasy VII','http://www.youtube.com/embed/gA0i7Er5KqA'],
           ['Dracula\'s Tomb: A Castlevania Medley','http://www.youtube.com/embed/vefZYD8EsMo'],
           //['Kingdom Hearts Groove','http://www.youtube.com/embed/9BhF00btCzA'],
           ['Attack on Titan OP - Guren no Yumiya','http://www.youtube.com/embed/e2vVBRyVW3M'],
           // ['Super Mario Bros 2 Gypsy Jazz -- Full Band Cover','http://www.youtube.com/embed/bK5tY6c4rcU'],
           ['Radical Dreamers: A Chrono Cross Medley','http://www.youtube.com/embed/hZtgRcz_d2g'],
           //['CODE:BREAKER OP - Dark Shame!','http://www.youtube.com/embed/mngFqdomTj8'],
           //['Card Captor Sakura ED - Groovy!','http://www.youtube.com/embed/az2yj8vgV50'],
           //['The Epic Final Fantasy V Medley','http://www.youtube.com/embed/Ginfs4TY0oo'],
          ];


/*********************************************************/


function loadVideo(){
    
    var first;
    var parent = dojo.byId('musiccontainer');
    var list;
    var t=0;
    
    for(var v in vid){
        if(t==0){
            
            /* CREATE FIRST VIDEO */
            first = createVideo(vid[v][0],vid[v][1],parent,false);
            
            /* CREATE LIST PLACEHOLDER */
            list = dojo.create('div',{'class':'hidden'},parent);
            
            /* CONNECT MORE BUTTON */
            var more = dojo.create('div',{'innerHTML':'Show More','class':'expandcollapse','id':'moreless'},parent);
            dojo.connect(more,'onclick',function(){toggleList(list,more,first[0],first[1])});
            
            t++;
        }else{
            /* CREATE HIDDEN VIDEOS */
            createVideo(vid[v][0],vid[v][1],list,true);
        }
    }
}

function createVideo(title,url,parent,hidden,id){
    
    var title;
    var video;
    var iframe;
    var hiddenclass;
    var hiddenpointer;
    
    if(hidden){
        hiddenclass=' hidden';
        hiddenpointer=' pointersim';
    }else{
        hiddenclass='';
        hiddenpointer='';
    }
    
    title = dojo.create('div',{'innerHTML':title,'class':'projecttitle '+hiddenpointer},parent);
    video = dojo.create('div',{'class':'video'+hiddenclass},parent);
    iframe = dojo.create('iframe',{
                         'width':'560px',
                         'height':'315px',
                         'src':url,
                         'frameborder':'0'},video);
    dojo.attr(iframe,'allowfullscreen');
    
    dojo.connect(title,'onclick',function(){toggleVideo(video,title);});
    /*dojo.connect(title,'onmouseover',function(){
                     if(dojo.hasClass(video,'hidden') && !dojo.hasClass(title,'pointersim')){
                         dojo.addClass(title,'pointersim');
                     }else if(!dojo.hasClass(video,'hidden') && dojo.hasClass(title,'pointersim')){
                         dojo.removeClass(title,'pointersim');
                     }
                 });*/
    
    return new Array(video,title);
}

function toggleList(list,more,first,title){
    
    if(dojo.hasClass(list,'hidden')){
        dojo.removeClass(list,'hidden');
        more.innerHTML='Show Fewer';
        
        dojo.window.scrollIntoView(list);
    }else{
        dojo.addClass(list,'hidden');
        more.innerHTML='Show More';
        toggleVideo(first,title);
    }
}

function toggleVideo(video,title){
    
    /* HIDE OTHER VIDEOS */
    dojo.query('.video').addClass('hidden');
    dojo.query('#music .projecttitle').addClass('pointersim');
    
    /* SHOW ONE AND SCROLL TO */
    dojo.removeClass(video,'hidden');
    dojo.removeClass(title,'pointersim');
    dojo.window.scrollIntoView(video);

}

function emailCaptcha(){
    
    var icon = dojo.byId('email');
    var popup = dojo.byId('emailpopup');
    
    dojo.connect(icon,'onmouseover',function(){dojo.toggleClass(popup,'hidden');});
    dojo.connect(icon,'onmouseout',function(){dojo.toggleClass(popup,'hidden');});
    
}
