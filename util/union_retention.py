import glob
import json

x_accessors = {"n_day", "week"}

result_day = []
result_day_expanded = []
result_week = []
result_week_expanded = []

def rename_keys(json_obj, suffix, exclude=x_accessors):
	ret = []
	for elem in json_obj:
		obj_i = {}
		for k in elem:
			new_key = k + suffix if k not in exclude else 'date'
			if "std" not in new_key:
				if "_cumm" in new_key:
					if 'expanded' in new_key:
						tag, splt = new_key.split('_cumm')
						v, group, typ, exp = splt.split('-')
						new_key = '_'.join([v, tag]) + suffix
					else:
						tag, splt = new_key.split('_cumm')
						v, group, typ = splt.split('-')
						new_key = '_'.join([v, tag]) + suffix
				obj_i[new_key] = elem[k]
		ret.append(obj_i)
	return ret

for filename in glob.glob("../data/*"):
	if '-5657-' in filename:
		identifier = '-' + '-'.join(filename.split('-')[2:]).strip('.json')
		with open(filename) as f:
			data = json.load(f)
			d = rename_keys(data, identifier)
			if 'expanded' in identifier:
				if 'week' in identifier:
					result_week_expanded.append(d)
				else:
					result_day_expanded.append(d)
			else: 
				if 'week' in identifier:
					result_week.append(d)
				else:
					result_day.append(d)

def merge_json(j, xa='date'):
	ret = j.pop()
	while len(j) > 0:
		nxt = j.pop()
		for i in range(len(ret)):
			elem = ret[i]
			xa_curr = elem[xa]
			xa_data = filter(lambda j: j[xa] == xa_curr, nxt)[0]
			for k in xa_data:
				if k != xa:
					elem[k] = xa_data[k]
			ret[i] = elem
	return ret



final = merge_json([merge_json(result_day), merge_json(result_week)])
final_expanded = merge_json([merge_json(result_day_expanded), merge_json(result_week_expanded)])



for i in final:
	print i['date']



with open("../data/retention.json", "w") as f:
	json.dump(final, f)

with open("../data/retention-expanded.json", "w") as f:
	json.dump(final_expanded, f)




