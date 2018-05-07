aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/release_version_pcts.json ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/meta57.csv ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/addonhist57.csv ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/addonhist56.csv ../data/

aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/retention-5657-week-expanded-fixed.json ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/retention-5657-week-fixed.json ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/retention-5657-fixed.json ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/addons57/retention-5657-expanded-fixed.json ../data/

aws s3 cp s3://telemetry-test-bucket/bmiroglio/webext-data/addon-counts-new-5.json ../data/
aws s3 cp s3://telemetry-test-bucket/bmiroglio/webext-data/addon-counts-new-nightly-2-2.json ../data/
python combine_results.py