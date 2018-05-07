import json
import pandas as pd
with open("./data/retention-5556-week.json") as f:
	j = json.load(f)

pd.DataFrame(j).to_csv("./data/week.csv", index=False)

with open("./data/retention-5556-week-expanded.json") as f:
	j = json.load(f)


print pd.DataFrame(j).to_csv("./data/week-expanded.csv", index=False)