# these are the measures for which will we estimate an effect
engagementMeasures <- c("active_ticks", "tab_open_event_count", 
                        "total_uri_count", "unique_domains_count",
                        "subsession_length","search_sources_search_bar",
                        "search_sources_url_bar",
                        "search_total",
                        "search_engines_yahoo",
                        "search_engines_google", "places_pages_count", "places_bookmarks_count")


code_log <- function(i) ifelse(i > 0, log(i), 0)
for (i in engagementMeasures) {
  log_pre <- paste("log_", i, sep='')
  post <- paste(i, "post", sep="_")
  log_post <- paste("log_", post, sep='')
  is_zero <- paste(i, "is_zero", sep = "_")
  d[log_pre] <- sapply(d[i], code_log)
  if (i!="memory_mb") {
    d[log_post] <- sapply(d[post], code_log)
  }
  d[is_zero] = factor(d[i] == 0)
  
}

# constructs a formula to be fed into lm()
# effect is the treatment binary variable
make.formula <- function(resp, addons=NULL, effect='adblocker') {
  y <- paste("log_", resp, "_post", sep="")
  X <- paste("log_", resp, sep="")
  controllers <- c("n", "log_memory_mb", paste("log", engagementMeasures, sep="_"))
  
  # if addons are specified, add them to formula
  # ignoring the treatment variable
  if (!is.null(addons)) {
    X <- paste(X, '+',  paste(addons, collapse = ' + '))
  } else { # add effect
    X <- paste(X, '+', effect)
  }
  X <- paste(X, "+" , paste(controllers, collapse=" + "))
  # cat(paste(y, '~', X))
  formula <- as.formula(paste(y, '~', X))
  formula
}

# returns a list of the top N addons in df
top_addons <- function(df, n) {
  sort(apply(select(df, contains("addon_")), 2, sum), decreasing = TRUE)[1:n]
}