import json 

def combine_results(rrb, rn):
    for i in range(len(rrb)):
        date = rrb[i]["submission_date"]
        for j in rn:
            daten = j["build_id"]
            if date == daten:
                for keyj in j:
                    if keyj != "build_id":
                        rrb[i][keyj] = j[keyj]
    return rrb 



with open("../data/addon-counts-new-5.json") as f1:
	rrb = json.load(f1)

with open("../data/addon-counts-new-nightly-2-2.json") as f2:
	rn = json.load(f2)


comb = combine_results(rrb, rn)

with open("../data/addon-counts-new-comb.json", "w") as outfile:
	json.dump(comb, outfile)


