(function() {
  win.mount("#new_chrs", function(dom) {
    return {
      controller: function() {
        var chrs;
        chrs = Mem.Query.chr_jobs.where({
          chr_set_id: "sf"
        }).sort(false, function(o) {
          return o.face.order;
        }).list;
        this.old_chrs = chrs.slice(0, 33);
        this.new_chrs = chrs.slice(33);
      },
      view: doc.component.map_faces_new.view
    };
  });

}).call(this);

