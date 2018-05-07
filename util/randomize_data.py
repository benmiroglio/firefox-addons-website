import json, random

PATH = "data/addon-counts-new.json"

def assign_random(path):
	"""
	Reads in json from <path> and assigns values to a random
	integer between 0 and 1000000. 
	"""
	with open(path) as f:
		data = json.load(f)

	for i in range(len(data)):
		entry = data[i]
		for j in entry:
			# preserve dates for rendering
			if j != "submission_date":
				if '_total' in j:
					lower, upper = 10000, 20000
				else:
					lower, upper = 0, 10000
				data[i][j] = random.randint(lower, upper)

	return data

def main():
	rand_data = assign_random(PATH)
	with open(PATH.split(".")[0] + "-randomized.json", "w") as f:
		json.dump(rand_data, f)

if __name__ == "__main__":
	main()
