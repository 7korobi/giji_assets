
describe "Mem.Query.faces" (...)!->
  it "bye jelemy" ->
    expect( Mem.Query.faces.find("c06") ).to.eq undefined
  it "symon" !->
    list = Mem.Query.faces.find("c99").chr_jobs.list
    expect( list[0].job ).to.eq "しんかいぎょ"
    expect( list[0].chr_set_id ).to.eq "animal"
    expect( list[1].job ).to.eq "厭世家"
    expect( list[1].chr_set_id ).to.eq "ririnra"

describe "Mem.Query.chr_jobs" (...)!->
  it "zoy" !->
    chr = Mem.Query.chr_jobs.face("c10").list
    expect( chr[0].job ).to.eq "小娘"
    expect( chr[0].chr_set_id ).to.eq "ririnra"
    expect( chr[0].chr_job_id ).to.eq "ririnra_c10"
    expect( chr[0].face.name ).to.eq "ゾーイ"
    expect( chr[0].face.face_id ).to.eq "c10"

    expect( chr[1].job ).to.eq "小銃協会"
    expect( chr[1].chr_set_id ).to.eq "time"
    expect( chr[1].chr_job_id ).to.eq "time_c10"
    expect( chr[1].face.name ).to.eq "ゾーイ"
    expect( chr[1].face.face_id ).to.eq "c10"

  it "iris" !->
    chr = Mem.Query.chr_jobs.face("c83").list
    expect( chr[0].job ).to.eq "受付"
    expect( chr[0].chr_set_id ).to.eq "ririnra"
    expect( chr[0].chr_job_id ).to.eq "ririnra_c83"
    expect( chr[0].face.name ).to.eq "アイリス"
    expect( chr[0].face.face_id ).to.eq "c83"

    expect( chr[1].job ).to.eq "虹追い"
    expect( chr[1].chr_set_id ).to.eq "mad"
    expect( chr[1].chr_job_id ).to.eq "mad_c83"
    expect( chr[1].face.name ).to.eq "アイリス"
    expect( chr[1].face.face_id ).to.eq "c83"
